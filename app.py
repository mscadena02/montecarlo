from flask import Flask, render_template, request, jsonify
import sqlite3
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/guardar', methods=['POST'])
def guardar():
    datos = request.get_json()          # recibe el JSON del frontend
    puntos = datos['puntos']            # extrae los puntos
    pi_estimado = datos['pi']           # extrae el pi estimado
    
    conn = sqlite3.connect('resultados.db')
    conn.execute('INSERT INTO simulaciones (puntos, pi_estimado) VALUES (?, ?)',
                 (puntos, pi_estimado))
    conn.commit()
    conn.close()
    
    return jsonify({'mensaje': 'guardado exitoso'})

@app.route('/historial', methods=['GET'])
def historial():
    conn = sqlite3.connect('resultados.db')
    cursor = conn.execute('SELECT puntos, pi_estimado, fecha FROM simulaciones ORDER BY fecha DESC')
    filas = cursor.fetchall()
    conn.close()
    
    resultados = [{'puntos': f[0], 'pi': f[1], 'fecha': f[2]} for f in filas]
    return jsonify(resultados)


if __name__ == '__main__':
    app.run(debug=True)



def init_db():
    conn = sqlite3.connect('resultados.db')
    conn.execute('''CREATE TABLE IF NOT EXISTS simulaciones
                 (id INTEGER PRIMARY KEY,
                  puntos INTEGER,
                  pi_estimado REAL,
                  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP)''')
    conn.commit()
    conn.close()

