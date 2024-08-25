from flask import Flask, request, jsonify, render_template
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/bfhl', methods=['POST'])
def bfhl_post():
    data = request.get_json()
    if 'data' not in data or not isinstance(data['data'], list):
        return jsonify({
            'is_success': False,
            'user_id': 'john_doe_17091999',
            'email': 'john@xyz.com',
            'roll_number': 'ABCD123',
            'numbers': [],
            'alphabets': [],
            'highest_lowercase_alphabet': []
        })

    data_list = data['data']
    
    numbers = [item for item in data_list if item.isdigit()]
    alphabets = [item for item in data_list if item.isalpha()]
    lowercase_alphabets = [item for item in alphabets if item.islower()]
    highest_lowercase_alphabet = [max(lowercase_alphabets, default='')]

    response = {
        'is_success': True,
        'user_id': 'john_doe_17091999',
        'email': 'john@xyz.com',
        'roll_number': 'ABCD123',
        'numbers': numbers,
        'alphabets': alphabets,
        'highest_lowercase_alphabet': highest_lowercase_alphabet
    }
    
    return jsonify(response)

@app.route('/bfhl', methods=['GET'])
def bfhl_get():
    return jsonify({
        'operation_code': 1
    })

if __name__ == '__main__':
    app.run(debug=True)
