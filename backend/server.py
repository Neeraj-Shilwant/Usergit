from flask import Flask, request, jsonify
import pickle

app = Flask(__name__)

@app.after_request

def add_cors_headers(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers',
 
'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
    return response

@app.route('/predict', methods=['POST'])
def predict():
    # Receive data from the ReactJS frontend
    
    data = request.get_json()
    print(data)
    star_count = data['star_count']
    repo_count = data['repo_count']
    followers_count = data['followers_count']
    following_count = data['following_count']
    foll_ratio = data['foll_ratio']
    n_lang = data['n_lang']
    n_cont = data['n_cont']
    org_flag_0 = data['org_flag_0']
    org_flag_1 = data['org_flag_1']
    # Prepare input data for the model
    input_data = [[star_count, repo_count, followers_count, following_count,foll_ratio,n_lang,n_cont,org_flag_0,org_flag_1]]
    
    gb_model = pickle.load(open('gb_regressor.pkl', 'rb'))
    # Predict the output using the loaded model
    predicted_output = gb_model.predict(input_data)[0]
    

    # Return the predicted output as JSON
    return jsonify({'predicted_output': round(predicted_output,2)})
    

if __name__ == '__main__':
    app.run(debug=True)
