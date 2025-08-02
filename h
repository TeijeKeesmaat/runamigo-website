warning: in the working copy of 'vercel.json', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'eas.json', LF will be replaced by CRLF the next time Git touches it
[1mdiff --git a/eas.json b/eas.json[m
[1mnew file mode 100644[m
[1mindex 0000000..a614f19[m
[1m--- /dev/null[m
[1m+++ b/eas.json[m
[36m@@ -0,0 +1,21 @@[m
[32m+[m[32m{[m
[32m+[m[32m  "cli": {[m
[32m+[m[32m    "version": ">= 16.8.0",[m
[32m+[m[32m    "appVersionSource": "remote"[m
[32m+[m[32m  },[m
[32m+[m[32m  "build": {[m
[32m+[m[32m    "development": {[m
[32m+[m[32m      "developmentClient": true,[m
[32m+[m[32m      "distribution": "internal"[m
[32m+[m[32m    },[m
[32m+[m[32m    "preview": {[m
[32m+[m[32m      "distribution": "internal"[m
[32m+[m[32m    },[m
[32m+[m[32m    "production": {[m
[32m+[m[32m      "autoIncrement": true[m
[32m+[m[32m    }[m
[32m+[m[32m  },[m
[32m+[m[32m  "submit": {[m
[32m+[m[32m    "production": {}[m
[32m+[m[32m  }[m
[32m+[m[32m}[m
[1mdiff --git a/vercel.json b/vercel.json[m
[1mindex f0328d2..3506829 100644[m
[1m--- a/vercel.json[m
[1m+++ b/vercel.json[m
[36m@@ -7,6 +7,13 @@[m
     }[m
   ],[m
   "routes": [[m
[32m+[m[32m    {[m
[32m+[m[32m      "src": "/.well-known/apple-app-site-association",[m
[32m+[m[32m      "dest": "/.well-known/apple-app-site-association",[m
[32m+[m[32m      "headers": {[m
[32m+[m[32m        "Content-Type": "application/json"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
     {[m
       "src": "/algemene-voorwaarden",[m
       "dest": "/algemene-voorwaarden.html"[m
