import json

# c é uma cidade que é um dicionário
def ordCidade(c):
    return c['nome'] # A lista de dicionários (cidades) é ordenada pelo nome

f = open("mapa.json")
mapa = json.load(f)
cidades = mapa['cidades']
ligacoes=mapa['ligações']

cidades.sort(key = ordCidade)

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
                <td>
                    <h3>Índice</h3>
                    <ul>
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
        <a href="{c['id']}">{c['nome']}</a>
    </li>
    """
    pagHTML += f"""
                        <a name="{c['id']}"/>
                        <h3>{c['nome']}</h3>
                        <p><b>População</b>{c['população']}</p>
                        <p><b>Descrição</b>{c['descrição']}</p>
                        <p><b>Distrito</b>{c['distrito']}</p>
    """
for c in cidades:
    for l in ligacoes:
        if l['origem'] == c['id']:
            pagHTML+= f"""
                        <a name="{c['id']}"/>
                        <h3>Ligações</h3>
                        <p><b>Destino</b>{l['destino']}</p>
                        <p><b>Distância</b>{l['distância']}</p>
                        <address><address/>
                        <center>
                            <hr width="80%"/>
                        </center>
            """

pagHTML += """
                </td>
            </tr>
        </table>
    </body>
</html>
"""

print(pagHTML)