import os, functools
ROOT = "/Users/aadityanilesiphone/Documents/GitHub/demo2/NileTechWebsite"
os.chdir(ROOT)
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
H = functools.partial(SimpleHTTPRequestHandler, directory=ROOT)
ThreadingHTTPServer(("127.0.0.1", 8765), H).serve_forever()
