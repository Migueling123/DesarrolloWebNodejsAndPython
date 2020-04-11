##import os
##os.system('cls')
#control shift r para recargar pagina sin cache
from flask import Flask, render_template

app=Flask(__name__)
@app.route('/')

def inicio():#definir funcion
    return render_template('inicio.html') 
@app.route('/acerca')
def acerca_de():
    return render_template('acercaDe.html')
@app.route('/contacto')
def contact():
    return render_template('contacto.html')


if __name__ == '__main__':
    app.run(debug=True)
    