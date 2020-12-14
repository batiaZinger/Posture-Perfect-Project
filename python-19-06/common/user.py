class User:
    def __init__(self,mail,name,password):
        self.mail = mail
        self.name = name
        self.password = password


def Convert(user):
    string=(user.mail+","+user.name+","+user.password)
    li = list(string.split(","))
    return li



