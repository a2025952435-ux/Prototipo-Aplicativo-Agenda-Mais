
import tkinter as tk
from tkinter import messagebox
from PIL import Image, ImageTk
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
        if aplicativo_pronto():
            atualizar_status("Aplicativo aberto!")
            webbrowser.open(URL)
            return

        if porta_ocupada():
            mostrar_erro(
                "A porta 8081 está ocupada por outro programa."
            )
            atualizar_status("Porta ocupada")
            return

        comando = shutil.which("pnpm.cmd")

        if not comando:
            mostrar_erro(
                "O pnpm não foi encontrado.\n\n"
                "Verifique se Node.js e pnpm estão instalados."
            )
            atualizar_status("pnpm não encontrado")
            return

        atualizar_status("Iniciando o Expo...")

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

        for tentativa in range(60):
            if aplicativo_pronto():
                atualizar_status("Aplicativo pronto!")
                webbrowser.open(URL)
                return

            if processo_expo.poll() is not None:
                mostrar_erro(
                    "O Expo foi encerrado antes de iniciar."
                )
                atualizar_status("Erro ao iniciar")
                return

            time.sleep(1)

        mostrar_erro("O Expo demorou muito para iniciar.")
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
        "Sistema de agendamento de consultas médicas.\n\n"
        "Desenvolvido com foco na acessibilidade "
        "de pessoas idosas.\n\n"
        "Tecnologias: TypeScript, React Native e Expo."
    )


# CARTILHA COM ZOOM E JANELA PROPORCIONAL

def abrir_cartilha():

    caminhos = [
        os.path.join(pasta, "cartilha.png"),
        os.path.join(pasta, "cartilha.png.png"),
        os.path.join(pasta, "utils", "Cartilha.png"),
        os.path.join(pasta, "utils", "cartilha.png")
    ]

    caminho = next(
        (item for item in caminhos if os.path.isfile(item)),
        None
    )

    if caminho is None:
        messagebox.showerror(
            "Cartilha não encontrada",
            "Não foi possível encontrar a cartilha.\n\n"
            "Coloque cartilha.png na mesma pasta do iniciar.py."
        )
        return

    try:
        with Image.open(caminho) as arquivo:
            imagem_original = arquivo.copy()
    except Exception as erro:
        messagebox.showerror(
            "Erro ao abrir cartilha",
            str(erro)
        )
        return

    largura_original, altura_original = imagem_original.size

    cartilha = tk.Toplevel(janela)
    cartilha.title("Cartilha do Usuário - AgendaMais+")
    cartilha.configure(bg="#F2E9FF")
    cartilha.resizable(True, True)

    # Descobre o tamanho disponível na tela
    largura_tela = cartilha.winfo_screenwidth()
    altura_tela = cartilha.winfo_screenheight()

    largura_maxima = max(450, largura_tela - 100)
    altura_maxima = max(300, altura_tela - 150)

    # Espaço reservado para título, zoom e botão inferior
    espaco_vertical = 185

    # Zoom inicial proporcional à tela
    zoom_inicial = min(
        1.0,
        largura_maxima / largura_original,
        (altura_maxima - espaco_vertical) / altura_original
    )

    zoom = [zoom_inicial]

    largura_imagem = round(largura_original * zoom_inicial)
    altura_imagem = round(altura_original * zoom_inicial)

    largura_janela = largura_imagem + 28
    altura_janela = altura_imagem + espaco_vertical

    largura_janela = min(largura_janela, largura_maxima)
    altura_janela = min(altura_janela, altura_maxima)

    # Centraliza a janela na tela
    pos_x = (largura_tela - largura_janela) // 2
    pos_y = (altura_tela - altura_janela) // 2

    cartilha.geometry(
        f"{largura_janela}x{altura_janela}+{pos_x}+{pos_y}"
    )

    cartilha.minsize(
        min(450, largura_janela),
        min(320, altura_janela)
    )

    cabecalho = tk.Frame(cartilha, bg="#7950B5")
    cabecalho.pack(fill="x")

    tk.Label(
        cabecalho,
        text="Cartilha do Usuário",
        font=("Arial", 16, "bold"),
        fg="white",
        bg="#7950B5"
    ).pack(pady=10)

    tk.Label(
        cartilha,
        text="Pessoas idosas, tecnologia e inclusão digital",
        font=("Arial", 10),
        fg="#7145A0",
        bg="#F2E9FF"
    ).pack(pady=(8, 3))

    # Controles de zoom
    controles = tk.Frame(cartilha, bg="#F2E9FF")
    controles.pack(pady=(4, 8))

    area = tk.Frame(cartilha, bg="white")
    area.pack(
        fill="both",
        expand=True,
        padx=8,
        pady=(0, 5)
    )

    canvas = tk.Canvas(
        area,
        bg="white",
        highlightthickness=0
    )

    barra_vertical = tk.Scrollbar(
        area,
        orient="vertical",
        command=canvas.yview
    )

    barra_horizontal = tk.Scrollbar(
        area,
        orient="horizontal",
        command=canvas.xview
    )

    canvas.configure(
        yscrollcommand=barra_vertical.set,
        xscrollcommand=barra_horizontal.set
    )

    barra_vertical.pack(side="right", fill="y")
    barra_horizontal.pack(side="bottom", fill="x")
    canvas.pack(side="left", fill="both", expand=True)

    percentual = tk.Label(
        controles,
        text="",
        font=("Arial", 10, "bold"),
        fg="#7145A0",
        bg="#F2E9FF",
        width=6
    )

    def mostrar_imagem():
        largura = max(1, int(largura_original * zoom[0]))
        altura = max(1, int(altura_original * zoom[0]))

        imagem_redimensionada = imagem_original.resize(
            (largura, altura),
            Image.Resampling.LANCZOS
        )

        foto = ImageTk.PhotoImage(imagem_redimensionada)

        canvas.delete("all")

        canvas.create_image(
            0,
            0,
            anchor="nw",
            image=foto
        )

        canvas.imagem = foto

        canvas.configure(
            scrollregion=(0, 0, largura, altura)
        )

        percentual.config(
            text=f"{round(zoom[0] * 100)}%"
        )

        canvas.xview_moveto(0)
        canvas.yview_moveto(0)

    def alterar_zoom(fator):
        novo_zoom = zoom[0] * fator
        zoom[0] = max(0.2, min(3.0, novo_zoom))
        mostrar_imagem()

    def ajustar_janela():
        canvas.update_idletasks()

        largura_disponivel = max(1, canvas.winfo_width())
        altura_disponivel = max(1, canvas.winfo_height())

        zoom[0] = min(
            largura_disponivel / largura_original,
            altura_disponivel / altura_original,
            3.0
        )

        mostrar_imagem()

    def criar_botao_zoom(texto, comando):
        return tk.Button(
            controles,
            text=texto,
            command=comando,
            font=("Arial", 9, "bold"),
            bg="#7950B5",
            fg="white",
            activebackground="#654096",
            activeforeground="white",
            relief="flat",
            padx=12,
            pady=7,
            cursor="hand2"
        )

    criar_botao_zoom(
        "- Diminuir",
        lambda: alterar_zoom(0.8)
    ).pack(side="left", padx=4)

    criar_botao_zoom(
        "Ajustar à janela",
        ajustar_janela
    ).pack(side="left", padx=4)

    criar_botao_zoom(
        "+ Aumentar",
        lambda: alterar_zoom(1.25)
    ).pack(side="left", padx=4)

    percentual.pack(side="left", padx=5)

    def rolar(evento):
        if evento.state & 0x0001:
            canvas.xview_scroll(
                -1 if evento.delta > 0 else 1,
                "units"
            )
        else:
            canvas.yview_scroll(
                -1 if evento.delta > 0 else 1,
                "units"
            )

    canvas.bind("<MouseWheel>", rolar)

    botao_fechar = tk.Button(
        cartilha,
        text="Fechar cartilha",
        command=cartilha.destroy,
        font=("Arial", 10, "bold"),
        bg="#7950B5",
        fg="white",
        activebackground="#654096",
        activeforeground="white",
        relief="flat",
        width=20,
        height=2,
        cursor="hand2"
    )

    botao_fechar.pack(pady=(3, 8))

    # Exibe a imagem no tamanho proporcional
    cartilha.after(100, mostrar_imagem)


# JANELA PRINCIPAL

janela = tk.Tk()
janela.title("AgendaMais+ - Inicializador")
janela.geometry("420x510")
janela.configure(bg="#F2E9FF")
janela.resizable(False, False)

titulo = tk.Label(
    janela,
    text="AgendaMais+",
    font=("Arial", 26, "bold"),
    fg="#7145A0",
    bg="#F2E9FF"
)
titulo.pack(pady=(35, 10))

subtitulo = tk.Label(
    janela,
    text="Sistema de agendamento acessível",
    font=("Arial", 11),
    fg="#685879",
    bg="#F2E9FF"
)
subtitulo.pack(pady=(0, 25))


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

botao(
    "Cartilha do Usuário",
    abrir_cartilha
).pack(pady=7)

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
