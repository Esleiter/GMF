from flask import Flask, render_template

# Crear una instancia de la aplicación Flask
app = Flask(__name__)

# Definir una ruta y una función asociada a esa ruta
@app.route('/')
def hello_world():
    mensaje = '¡Hola, mundo!'
    return render_template('index.html', mensaje=mensaje)

# Ejecutar la aplicación en el servidor local en el puerto 5000
if __name__ == '__main__':
    app.run(debug=True)