
import tkinter as tk
from tkinter import messagebox
import subprocess
import os
import sys
import shutil
import socket
import time
import threading
import urllib.request
import webbrowser

PORTA = 8081
URL = f"http://localhost:{PORTA}"

# Localiza a pasta do projeto, inclusive no executavel .exe
if getattr(sys, "frozen", False):
    pasta = os.path.dirname(sys.executable)
else:
    pasta = os.path.dirname(os.path.abspath(__file__))

processo_expo = None
iniciando = False


def porta_ocupada():
    try:
        with socket.create_connection(("127.0.0.1", PORTA), timeout=1):
            return True
    except OSError:
        return False


def aplicativo_pronto():
    try:
        with urllib.request.urlopen(URL, timeout=2) as resposta:
            return resposta.status == 200
    except Exception:
        return False


def mostrar_erro(mensagem):
    janela.after(
        0,
        lambda: messagebox.showerror("AgendaMais+", mensagem)
    )


def atualizar_status(mensagem):
    janela.after(0, lambda: status.config(text=mensagem))


def finalizar_inicio():
    global iniciando
    iniciando = False
    janela.after(
        0,
        lambda: botao_iniciar.config(state="normal")
    )


def executar_expo():
    global processo_expo

    try:
        # Se o aplicativo ja estiver funcionando
        if aplicativo_pronto():
            atualizar_status("Aplicativo aberto!")
            webbrowser.open(URL)
            return

        # Se outra aplicacao estiver usando a porta
        if porta_ocupada():
            mostrar_erro(
                "A porta 8081 esta ocupada por outro programa.\n"
                "Feche o programa que esta usando essa porta "
                "e tente novamente."
            )
            atualizar_status("Porta 8081 ocupada")
            return

        comando = shutil.which("pnpm.cmd")

        if not comando:
            mostrar_erro(
                "O pnpm nao foi encontrado.\n\n"
                "Verifique se Node.js e pnpm estao instalados."
            )
            atualizar_status("pnpm nao encontrado")
            return

        atualizar_status("Iniciando o Expo...")

        # Inicia o Expo sem abrir outra janela de terminal
        processo_expo = subprocess.Popen(
            [
                comando,
                "exec",
                "expo",
                "start",
                "--web",
                "--port",
                str(PORTA),
                "--non-interactive"
            ],
            cwd=pasta,
            stdin=subprocess.DEVNULL,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
            creationflags=subprocess.CREATE_NO_WINDOW
        )

        # Aguarda o servidor iniciar
        for tentativa in range(60):
            if aplicativo_pronto():
                atualizar_status("Aplicativo pronto!")
                webbrowser.open(URL)
                return

            if processo_expo.poll() is not None:
                mostrar_erro(
                    "O Expo foi encerrado antes de iniciar.\n"
                    "Verifique as dependencias do projeto."
                )
                atualizar_status("Erro ao iniciar o Expo")
                return

            time.sleep(1)

        mostrar_erro(
            "O Expo demorou muito para iniciar.\n"
            "Verifique se o projeto esta funcionando."
        )
        atualizar_status("Tempo de espera excedido")

    except Exception as erro:
        mostrar_erro(str(erro))
        atualizar_status("Erro ao iniciar")

    finally:
        finalizar_inicio()


def iniciar():
    global iniciando

    if iniciando:
        return

    iniciando = True
    botao_iniciar.config(state="disabled")
    atualizar_status("Preparando aplicativo...")

    threading.Thread(
        target=executar_expo,
        daemon=True
    ).start()


def sobre():
    messagebox.showinfo(
        "Sobre o AgendaMais+",
        "Sistema de agendamento de consultas medicas.\n\n"
        "Desenvolvido com foco na acessibilidade "
        "de pessoas idosas.\n\n"
        "Tecnologias: TypeScript, React Native e Expo."
    )


janela = tk.Tk()
janela.title("AgendaMais+ - Inicializador")
janela.geometry("420x440")
janela.configure(bg="#F2E9FF")
janela.resizable(False, False)

titulo = tk.Label(
    janela,
    text="AgendaMais+",
    font=("Arial", 26, "bold"),
    fg="#7145A0",
    bg="#F2E9FF"
)
titulo.pack(pady=(45, 10))

subtitulo = tk.Label(
    janela,
    text="Sistema de agendamento acessivel",
    font=("Arial", 11),
    fg="#685879",
    bg="#F2E9FF"
)
subtitulo.pack(pady=(0, 35))


def botao(texto, comando):
    return tk.Button(
        janela,
        text=texto,
        command=comando,
        font=("Arial", 12, "bold"),
        bg="#7950B5",
        fg="white",
        activebackground="#654096",
        activeforeground="white",
        relief="flat",
        width=27,
        height=2,
        cursor="hand2"
    )


botao_iniciar = botao("Iniciar aplicativo", iniciar)
botao_iniciar.pack(pady=7)

botao("Sobre o projeto", sobre).pack(pady=7)
botao("Sair", janela.destroy).pack(pady=7)

status = tk.Label(
    janela,
    text="Pronto para iniciar",
    font=("Arial", 10),
    fg="#685879",
    bg="#F2E9FF"
)
status.pack(pady=15)

janela.mainloop()
