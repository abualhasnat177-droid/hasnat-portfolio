$git = "C:\Program Files\Git\bin\git.exe"
& $git config user.email "abualhasnat177-droid@users.noreply.github.com"
& $git config user.name "abualhasnat177-droid"
& $git init
& $git add .
& $git commit -m "Initial commit with blank screen fix and contact form"
& $git branch -M main
& $git remote remove origin
& $git remote add origin https://github.com/abualhasnat177-droid/hasnat-portfolio.git
& $git push -u origin main --force
