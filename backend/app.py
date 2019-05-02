# -*- coding: utf-8 -*-

from flask import Flask, jsonify
from flask_cors import CORS

DEBUG = True

app = Flask(__name__)
app.config.from_object(__name__)

CORS(app)


@app.route('/list', methods=['GET'])
def list():
    return jsonify(
        [{
            'id': 4,
            'name': '大正　四郎',
            'mail': 'shiro@hoge.com',
            'status': '1',
            'date': '2019-01-04 9:30:33',
        },
        {
            'id': 3,
            'name': '昭和　三郎',
            'mail': 'saburo@hoge.com',
            'status': '1',
            'date': '2019-01-03 9:20:22'
        },
        {
            'id': 2,
            'name': '平成　二郎',
            'mail': 'jiro@hoge.com',
            'status': '1',
            'date': '2019-01-02 9:10:11',
        },
        {
            'id': 1,
            'name': '令和　太郎',
            'mail': 'taro@hoge.com',
            'status': '2',
            'date': '2019-01-01 9:00:00'
        }]
    )


if __name__ == '__main__':
    app.run()
