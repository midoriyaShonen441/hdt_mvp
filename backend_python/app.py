from pythainlp import word_tokenize
from flask import Flask , request
from flask_cors import CORS

from pythainlp.corpus import thai_stopwords
from wordcloud import WordCloud
import matplotlib.pyplot as plt
from io import BytesIO
import base64
import matplotlib
matplotlib.use('Agg')



app = Flask(__name__) 
CORS(app)

is_font_path = "./THSarabunNew.ttf"

@app.route('/faskapi/wordcloud', methods = ['POST'])
def send_word_cloud():
    image = BytesIO()
    set_stop_word =  thai_stopwords()
    base64_array = []
    if request.method == 'POST':
        req = request.get_json(force=True)

        text = """สสส. เปิดตัว “พระรอด 2.0” พระพุทธรูปหน้ารถ ส่งเสียงพระพยอมเตือนหากขับเร็วเกิน
                ถือว่าเป็นข่าวเชิงเทคโนโลยีไลฟ์สไตล์อย่างปฏิเสธไม่ได้ เมื่อ สสส. เปิดตัว Road Safety Project ร่วมมือกับพระพยอม กัลยาโณ เปิดตัวพระพุทธรูปไว้ประทับหน้าคอนโซลรถ ที่ติดตั้งกลไก GPS ตรวจจับความเร็วไว้ภายใน พร้อมส่งเสียงเตือนเป็นเสียงพระพยอมให้คนขับลดความเร็วลง
                สสส. ระบุว่า เมืองไทยเป็นเมืองพุทธ มีคนบูชาพระหน้ารถมากมาย แต่กลับมียอดการเกิดอุบัติเหตุบนท้องถนนมากเป็นอันดับ 2 ของโลก จึงคิดแคมเปญนี้ร่วมกับ BBDO Bangkok เอเจนซี่โฆษณาสร้างสิ่งนี้ขึ้นมา ยังไม่มีข้อมูลว่าจะผลิตจริงหรือไม่
                ที่มา - Facebook ของ สสส."""

        words = word_tokenize(text)
        all_words = ' '.join(words).lower().strip()
        
        wordcloud = WordCloud(
            regexp='[ก-๙]+',
            font_path=is_font_path,
            stopwords=set_stop_word,
            width=250, 
            height=250,
            prefer_horizontal=1,
            max_words=50, 
            colormap='tab20c',
            background_color = 'white').generate(all_words)

        plt.imshow(wordcloud)
        plt.axis('off')
        plt.tight_layout(pad=0)
        plt.savefig(image, format='png')
        base64_img = base64.encodestring(image.getvalue())

        # mydata = {
        #     "arrayImg": str(base64_img)
        # }

        # base64_array.append(mydata)
 
        return  base64_img


if __name__ == '__main__':
    app.run(port=8773)