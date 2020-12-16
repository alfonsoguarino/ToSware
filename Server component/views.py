import csv
import math
import pickle
import time

import psutil
import tensorflow_hub as hub
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from langdetect import detect
from sentence_splitter import SentenceSplitter
import tensorflow
import tensorflow_text
CORS_ORIGIN_ALLOW_ALL = True

module_url = "https://tfhub.dev/google/universal-sentence-encoder-multilingual/3" #modulo USE multilingua
model = hub.load(module_url) #caricamento del modulo
@csrf_exempt
def embed(input): #funzione per richiamare il modulo sul testo dato in input
    return model(input)
@csrf_exempt
def prendi(request):
    start_time = time.time()
    testo = request.POST.get('testT', None)
    lingua = detect(testo) #rilevamento della lingua del testo dato in input
    splitter = SentenceSplitter(language=lingua) #come deve dividere (splittare) il testo in base alla lingua rilevata
    testoEm = splitter.split(text=testo) #divisione (split) del testo
    message_embeddings = embed(testoEm) #embedding sul testo splittato
    fileSvm = open("/home/angela/PycharmProjects/ServerDjangoGit/ServerDjangoProva/SVMAll.pickle", 'rb') #richiamo il classificatore SVM
    svm = pickle.load(fileSvm) #carico il classificatore SVM
    preSvm = svm.predict(message_embeddings) #utilizzo di SVM per rilevare a quale categoria appartiene ogni split del testo
    fileRf = open("/home/angela/PycharmProjects/ServerDjangoGit/ServerDjangoProva/RFFireness.pickle", 'rb') #richiamo il calssificatore RF
    rf = pickle.load(fileRf)# carico il classificatore RF
    preRf = rf.predict_proba(message_embeddings) #utilizzo di RF per rilevare il livello di fireness al quale appartiene ogni embedding
    ca = preSvm.tolist() #metto in una lista le categoria di appartenenza di ogni frase splittata
    mat = preRf.tolist() #metto in una lista le probabilità di appartenenza alle fireness di ogni frase splittata
    max = []
    perc = []
    temp_p = 0
    for i in range(len(mat)): #questo for serve per individuare la massima probabilità di appartenenza della fireness
        massimo = mat[i][0]
        temp = 0
        for j in range(len(mat[i])):
            if mat[i][j] > massimo:
                massimo = mat[i][j]
                temp_p = massimo
                temp = j
        tras = temp_p * 100
        arr = math.trunc(tras)
        perc.append(arr)
        max.append(temp) #metto in questo vettore la probabilità più alta
    fra = { #oggetto json di dati da passare al client
        'frase': testoEm,
        'cate': ca,
        'fair': max,
        'perc': perc
    }
    p_server = psutil.Process()  # numero pid
    ram = round(p_server.memory_percent(), 3)
    cpu = str(p_server.cpu_percent(interval=1.0))
    write_test(start_time, ram, cpu)
    return JsonResponse(fra) #restituisce la risposta json
    fileSvm.close()#chiudo il file del classificatore SVM
    fileRf.close()#chiudo file del classificatore RF

def write_test(startTime, ram, cpu):
    w = csv.writer(open("res_test.csv","a"), dialect='excel', delimiter=',', quotechar='"', quoting=csv.QUOTE_NONNUMERIC)
    end_time = time.time() - startTime
    #print("\"{}\", {}".format(text, end_time))
    w.writerow([round(end_time,2), ram, cpu])