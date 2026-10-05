import os, functools
ROOT = "/Users/aadityanilesiphone/Documents/GitHub/demo2/Jamie"
os.chdir(ROOT)
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
class H(SimpleHTTPRequestHandler):
    def log_message(self,*a): pass
ThreadingHTTPServer(("127.0.0.1", 8765), functools.partial(H, directory=ROOT)).serve_forever()
