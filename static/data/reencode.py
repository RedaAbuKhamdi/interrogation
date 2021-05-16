from os import listdir
def reencode(file_name):
    file = None
    content = ''
    try:
        file = open(file_name, "r", encoding='utf-8')
        content = file.read()
    except:
        file = open(file_name, "r")
        content = file.read()
    finally:
        file.close()
        
    print(file_name)
    if content[len(content)-1] == '\n':
        content = content[:-1]
    content = content.replace('\n','<br>')
    print(content)
    file = open('utf8/'+file_name, "w", encoding='utf-8')
    file.write(content)
    file.close()



files = listdir()
for file in files:
    if 'json' in file:
        reencode(file)
