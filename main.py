import json
import os
from datetime import datetime


ARQUIVO_CHAMADOS = "chamados.json"


def carregar_chamados():
    if not os.path.exists(ARQUIVO_CHAMADOS):
        return []

    with open(ARQUIVO_CHAMADOS, "r", encoding="utf-8") as arquivo:
        try:
            return json.load(arquivo)
        except json.JSONDecodeError:
            return []


def salvar_chamados():
    with open(ARQUIVO_CHAMADOS, "w", encoding="utf-8") as arquivo:
        json.dump(chamados, arquivo, indent=4, ensure_ascii=False)


def gerar_id():
    if len(chamados) == 0:
        return 1

    maior_id = max(chamado["id"] for chamado in chamados)
    return maior_id + 1


chamados = carregar_chamados()


def exibir_menu():
    print("\n===== SISTEMA DE CHAMADOS DE TI =====")
    print("1 - Cadastrar chamado")
    print("2 - Listar chamados")
    print("3 - Buscar chamado")
    print("4 - Alterar status")
    print("5 - Exibir estatísticas")
    print("0 - Sair")


def cadastrar_chamado():
    print("\n===== CADASTRAR CHAMADO =====")

    nome = input("Nome do solicitante: ").strip()
    setor = input("Setor: ").strip()
    descricao = input("Descrição do problema: ").strip()

    if nome == "" or setor == "" or descricao == "":
        print("\nErro: nome, setor e descrição são obrigatórios.")
        return

    print("\nPrioridade do chamado:")
    print("1 - Baixa")
    print("2 - Média")
    print("3 - Alta")

    opcao_prioridade = input("Escolha a prioridade: ").strip()

    if opcao_prioridade == "1":
        prioridade = "Baixa"
    elif opcao_prioridade == "2":
        prioridade = "Média"
    elif opcao_prioridade == "3":
        prioridade = "Alta"
    else:
        print("Prioridade inválida. O chamado será cadastrado como prioridade Baixa.")
        prioridade = "Baixa"

    chamado = {
        "id": gerar_id(),
        "nome": nome,
        "setor": setor,
        "descricao": descricao,
        "prioridade": prioridade,
        "status": "Aberto",
        "data_abertura": datetime.now().strftime("%d/%m/%Y %H:%M")
    }

    chamados.append(chamado)
    salvar_chamados()

    print("\nChamado cadastrado com sucesso!")
    print(f"ID do chamado: {chamado['id']}")


def listar_chamados():
    print("\n===== LISTA DE CHAMADOS =====")

    if len(chamados) == 0:
        print("Nenhum chamado cadastrado.")
        return

    for chamado in chamados:
        print("-" * 40)
        print(f"ID: {chamado['id']}")
        print(f"Solicitante: {chamado['nome']}")
        print(f"Setor: {chamado['setor']}")
        print(f"Descrição: {chamado['descricao']}")
        print(f"Prioridade: {chamado['prioridade']}")
        print(f"Status: {chamado['status']}")
        print(f"Data de abertura: {chamado.get('data_abertura', 'Não registrada')}")
    print("-" * 40)


def buscar_chamado():
    print("\n===== BUSCAR CHAMADO =====")

    if len(chamados) == 0:
        print("Nenhum chamado cadastrado.")
        return

    try:
        id_busca = int(input("Digite o ID do chamado: "))
    except ValueError:
        print("ID inválido. Digite apenas números.")
