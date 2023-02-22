import json

# c é uma cidade que é um dicionário
def ordCidade(c):
    return c['nome'] # A lista de dicionários (cidades) é ordenada pelo nome

f = open("mapa.json")
mapa = json.load(f)
cidades = mapa['cidades']
ligacoes=mapa['ligações']
cidadesplusligacoes=dict()

cidades.sort(key = ordCidade)

codificacao=dict()
for l in ligacoes:
    for c in cidades:
        if(l["destino"]==c["id"]):
            codificacao[l["destino"]]=c["nome"]

for c in cidades:
    cidadesplusligacoes[c["nome"]]=[]

for c in cidades:
    for l in ligacoes:
        if c["id"]==l["origem"]:
           cidadesplusligacoes[c["nome"]].append((codificacao[l["destino"]],l["distância"]))

pagHTML = """
<!DOCTYPE html>

<html>
    <head>
        <title>Mapa Virtual</title>
        <meta charset="utf-8"/>
    </head>
    <body>
        <center>
            <h1>Mapa Virtual</h1>
        </center>
        <table>
            <tr>
                <!-- Índice-->
                <td valign="top">
                    <h3>Índice</h3>
                    <ul>
"""
for c in cidades:
    pagHTML+=f"""
    <li>
        <a href="#{c["id"]}">{c["nome"]}</a>
    </li>
    """
pagHTML += """
                    </ul>
                </td>
                <!-- Conteúdo-->
                <td>
"""

for c in cidades:
    pagHTML += f"""
    <li>
        <a href="#{c['id']}">{c['nome']}</a>
    </li>
    """
    pagHTML += f"""
                        <a name="{c['id']}"/>
                        <h3>{c['nome']}</h3>
                        <p><b>População</b>{c['população']}</p>
                        <p><b>Descrição</b>{c['descrição']}</p>
                        <p><b>Distrito</b>{c['distrito']}</p>
    """
    pagHTML+="""
    <h3>Ligações</h3>
    """
    listaLigacoes=cidadesplusligacoes[c["nome"]]
    for par in listaLigacoes:
        pagHTML+=f"""
                    <p><b>Destino:</b>{par[0]}<b> Distância:</b>{par[1]}</p>
        """

pagHTML += """
                </td>
            </tr>
        </table>
    </body>
</html>
"""

print(pagHTML)