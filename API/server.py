from flask import Flask
from flask_restful import Api, Resource, reqparse, abort

app = Flask(__name__)
api = Api(app)


video_put_args = reqparse.RequestParser()
video_put_args.add_argument("name", type=str, help="Name missing", required=True)
video_put_args.add_argument("view", type=int, help="Views missing", required=True)
video_put_args.add_argument("likes", type=int, help="Likes missing", required=True)

videos = {}

def abortIfVideoIdNotExist(video_id):
    if video_id not in videos:
        abort(404, message="Video ID is not valid...")

class HelloWorld(Resource):
    def get(self, video_id):
        abortIfVideoIdNotExist(video_id)
        return videos[video_id]

    def put(self, video_id):
        args = video_put_args.parse_args()
        videos[video_id]=args
        return videos[video_id], 201

api.add_resource(HelloWorld, "/video/<int:video_id>")

if __name__ == "__main__":
    app.run(debug=True)