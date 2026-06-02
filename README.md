# Sistema de Chamados de TI

Projeto pessoal desenvolvido para simular a abertura e o gerenciamento de chamados técnicos em um ambiente de TI.

A aplicação possui uma área para o usuário abrir chamados e uma área administrativa para gerenciamento, acompanhamento, edição e atualização dos chamados cadastrados.

## Objetivo do projeto

O objetivo deste projeto é praticar conceitos fundamentais de desenvolvimento de sistemas, lógica de programação, manipulação de dados, interface web e organização de aplicações.

O sistema foi criado como projeto de portfólio para demonstrar conhecimentos iniciais em desenvolvimento web e programação.

## Funcionalidades

### Área do usuário

- Abertura de novos chamados
- Cadastro do nome do solicitante
- Cadastro do setor
- Descrição do problema
- Seleção de prioridade
- Geração de protocolo do chamado
- Mensagem de confirmação após o envio
- Alternância entre modo claro e modo escuro

### Área administrativa

- Visualização de todos os chamados cadastrados
- Cards com estatísticas gerais
- Filtro por status
- Filtro por prioridade
- Busca por ID, nome, setor ou descrição
- Edição de chamados
- Alteração de status
- Marcar chamado como "Em atendimento"
- Marcar chamado como "Resolvido"
- Reabrir chamado
- Excluir chamado
- Exibição de data de abertura
- Exibição de data de resolução
- Alternância entre modo claro e modo escuro

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- Python
- JSON
- LocalStorage

## Estrutura do projeto

```text
sistema-chamados-ti/
│
├── main.py
├── chamados.json
├── README.md
│
└── frontend/
    ├── index.html
    ├── usuario.html
    ├── admin.html
    ├── style.css
    └── script.js
```

## Como executar o front-end

1. Abra a pasta do projeto no computador.

2. Acesse a pasta:

```text
frontend
```

3. Abra o arquivo:

```text
index.html
```

O arquivo `index.html` redireciona automaticamente para a página `usuario.html`.

Também é possível abrir diretamente:

```text
usuario.html
```

para acessar a área do usuário.

Para acessar o painel administrativo, abra:

```text
admin.html
```

## Como executar a versão em Python

A versão em Python funciona pelo terminal e permite cadastrar, listar, buscar e gerenciar chamados com persistência em arquivo JSON.

Para executar:

```bash
python main.py
```

Caso o comando acima não funcione, tente:

```bash
python3 main.py
```

ou:

```bash
py main.py
```

## Observação sobre a área administrativa

A área administrativa está disponível como demonstração do projeto.

Em uma aplicação real, essa área deveria ser protegida por autenticação, com login, senha e controle de permissões. Neste projeto, o foco foi simular a separação entre a área do usuário e a área administrativa.

## Possíveis melhorias futuras

- Implementar login para usuários e administradores
- Conectar o front-end ao back-end em Python
- Criar uma API com Flask ou FastAPI
- Substituir LocalStorage por banco de dados
- Adicionar cadastro de usuários
- Adicionar histórico de alterações dos chamados
- Adicionar gráficos no painel administrativo
- Fazer deploy do front-end
- Criar autenticação real para proteger a área administrativa

## Aprendizados desenvolvidos

Durante o desenvolvimento deste projeto, foram praticados conceitos como:

- Estruturação de páginas HTML
- Estilização com CSS
- Responsividade
- Manipulação do DOM com JavaScript
- Uso de LocalStorage
- Criação de filtros e buscas
- Organização de código
- Separação entre área do usuário e área administrativa
- Lógica de cadastro, edição, exclusão e alteração de status
- Persistência de dados em JSON na versão Python

## Autor

Desenvolvido por Pedro de Sena e Paula.

Projeto criado como parte dos estudos em Ciência da Computação e desenvolvimento de software.