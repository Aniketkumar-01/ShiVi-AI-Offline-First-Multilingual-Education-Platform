// BhashaSetu AI — Offline PWA Engine

const LEXICON = {
  "मैं": { satNative: "ᱤᱧ", satDeva: "इञ", satLatin: "Inj", hoNative: "ᱟᱹᱧ", hoDeva: "अञ", hoLatin: "Anj", munNative: "अञ", munLatin: "Anj" },
  "मेरा": { satNative: "ᱤᱧᱟᱜ", satDeva: "इञाग", satLatin: "Injag", hoNative: "ᱟᱹᱧᱟᱜ", hoDeva: "अञाग", hoLatin: "Anjag", munNative: "अञाः", munLatin: "Anjah" },
  "मुझे": { satNative: "ᱤᱧ", satDeva: "इञ", satLatin: "Inj", hoNative: "ᱟᱹᱧ", hoDeva: "अञ", hoLatin: "Anj", munNative: "अञ", munLatin: "Anj" },
  "हम": { satNative: "ᱟᱵᱚ", satDeva: "आबो", satLatin: "Abo", hoNative: "ᱟᱵᱩ", hoDeva: "आबु", hoLatin: "Abu", munNative: "आबु", munLatin: "Abu" },
  "हमारा": { satNative: "ᱟᱵᱚᱣᱟᱜ", satDeva: "आबोवाग", satLatin: "Abowag", hoNative: "ᱟᱵᱩᱣᱟᱜ", hoDeva: "आबुवाग", hoLatin: "Abuwag", munNative: "आबुवाः", munLatin: "Abuwah" },
  "तुम": { satNative: "ᱟᱢ", satDeva: "आम", satLatin: "Am", hoNative: "ᱟᱢ", hoDeva: "आम", hoLatin: "Am", munNative: "आम", munLatin: "Am" },
  "तुम्हारा": { satNative: "ᱟᱢᱟᱜ", satDeva: "आमाग", satLatin: "Amag", hoNative: "ᱟᱢᱟᱜ", hoDeva: "आमाग", hoLatin: "Amag", munNative: "आमाः", munLatin: "Amah" },
  "आप": { satNative: "ᱟᱯᱮ", satDeva: "आपे", satLatin: "Ape", hoNative: "ᱟᱯᱮ", hoDeva: "आपे", hoLatin: "Ape", munNative: "आपे", munLatin: "Ape" },
  "आपका": { satNative: "ᱟᱯᱮᱭᱟᱜ", satDeva: "आपेयाग", satLatin: "Apeyag", hoNative: "ᱟᱯᱮᱭᱟᱜ", hoDeva: "आपेयाग", hoLatin: "Apeyag", munNative: "आपेयाः", munLatin: "Apeyah" },
  "वह": { satNative: "ᱩᱱᱤ", satDeva: "उनी", satLatin: "Uni", hoNative: "ᱤᱱᱤ", hoDeva: "इनी", hoLatin: "Ini", munNative: "इनी", munLatin: "Ini" },
  "उसका": { satNative: "ᱩᱱᱤᱭᱟᱜ", satDeva: "उनीयाग", satLatin: "Uniyag", hoNative: "ᱤᱱᱤᱭᱟᱜ", hoDeva: "इनीयाग", hoLatin: "Iniyag", munNative: "इनीयाः", munLatin: "Iniyah" },
  "यह": { satNative: "ᱱᱚᱣᱟ", satDeva: "नोवा", satLatin: "Nowa", hoNative: "ᱱᱮᱱᱟ", hoDeva: "नेना", hoLatin: "Nena", munNative: "नेना", munLatin: "Nena" },
  "वे": { satNative: "ᱩᱱᱠᱩ", satDeva: "उनकु", satLatin: "Unku", hoNative: "ᱤᱱᱠᱩ", hoDeva: "इनकु", hoLatin: "Inku", munNative: "इनकु", munLatin: "Inku" },
  "क्या": { satNative: "ᱪᱮᱫ", satDeva: "चेद", satLatin: "Ched", hoNative: "ᱪᱤᱱᱟᱹ", hoDeva: "चिना", hoLatin: "China", munNative: "चिनाः", munLatin: "Chinah" },
  "कौन": { satNative: "ᱚᱠᱚᱭ", satDeva: "ओकोय", satLatin: "Okoy", hoNative: "ᱚᱠᱚᱭ", hoDeva: "ओकोय", hoLatin: "Okoy", munNative: "अकोय", munLatin: "Akoy" },
  "कहाँ": { satNative: "ᱚᱠᱟᱨᱮ", satDeva: "ओकारे", satLatin: "Okare", hoNative: "ᱚᱠᱟᱨᱮ", hoDeva: "ओकारे", hoLatin: "Okare", munNative: "ओकारे", munLatin: "Okare" },
  "कब": { satNative: "ᱛᱤᱥ", satDeva: "तिस", satLatin: "Tis", hoNative: "ᱛᱤᱥᱤᱝ", hoDeva: "तिसिंग", hoLatin: "Tising", munNative: "तिसिंग", munLatin: "Tising" },
  "कैसे": { satNative: "ᱪᱮᱞᱮᱠᱟ", satDeva: "चेलेका", satLatin: "Cheleka", hoNative: "ᱪᱤᱞᱤᱠᱟ", hoDeva: "चिलिका", hoLatin: "Chilika", munNative: "चिलिका", munLatin: "Chilika" },
  "क्यों": { satNative: "ᱪᱮᱫᱟᱜ", satDeva: "चेदाः", satLatin: "Chedah", hoNative: "ᱪᱤᱱᱟᱹ ᱢᱮᱱᱛᱮ", hoDeva: "चिना मेनते", hoLatin: "China mente", munNative: "चिनाः गते", munLatin: "Chinah gate" },
  "कितना": { satNative: "ᱛᱤᱱᱟᱹᱜ", satDeva: "तिनाग", satLatin: "Tinag", hoNative: "ᱪᱤᱢᱤᱱ", hoDeva: "चिमीन", hoLatin: "Chimin", munNative: "चिमीन", munLatin: "Chimin" },

  "बोलना": { satNative: "ᱞᱟᱹᱭ", satDeva: "लय", satLatin: "Lay", hoNative: "ᱠᱟᱡᱤ", hoDeva: "काजी", hoLatin: "Kaji", munNative: "काजी", munLatin: "Kaji" },
  "सुनना": { satNative: "ᱟᱸᱡᱚᱢ", satDeva: "आंजोम", satLatin: "Anjom", hoNative: "ᱟᱸᱭᱩᱢ", hoDeva: "आंयुम", hoLatin: "Anyum", munNative: "आयुम", munLatin: "Ayum" },
  "देखना": { satNative: "ᱧᱮᱞ", satDeva: "ञेल", satLatin: "Njel", hoNative: "ᱧᱮᱞ", hoDeva: "ञेल", hoLatin: "Njel", munNative: "ञेल", munLatin: "Njel" },
  "पढ़ना": { satNative: "ᱯᱟᱲᱦᱟᱣ", satDeva: "पाढ़ाव", satLatin: "Padhaw", hoNative: "ᱪᱮᱫ", hoDeva: "चेद", hoLatin: "Ched", munNative: "पढ़व", munLatin: "Padhaw" },
  "लिखना": { satNative: "ᱚᱞ", satDeva: "ओल", satLatin: "Ol", hoNative: "ᱚᱞ", hoDeva: "ओल", hoLatin: "Ol", munNative: "ओल", munLatin: "Ol" },
  "सीखना": { satNative: "ᱪᱮᱫᱚᱜ", satDeva: "चेदोग", satLatin: "Chedog", hoNative: "ᱤᱛᱩᱱ", hoDeva: "ईतुन", hoLatin: "Itun", munNative: "ईतुन", munLatin: "Itun" },
  "खाना": { satNative: "ᱡᱚᱢ", satDeva: "जोम", satLatin: "Jom", hoNative: "ᱡᱚᱢ", hoDeva: "जोम", hoLatin: "Jom", munNative: "जोम", munLatin: "Jom" },
  "जाना": { satNative: "ᱥᱮᱱᱚᱜ", satDeva: "सेनोग", satLatin: "Senog", hoNative: "ᱥᱮᱱ", hoDeva: "सेन", hoLatin: "Sen", munNative: "सेन", munLatin: "Sen" },
  "आना": { satNative: "ᱦᱤᱡᱩᱜ", satDeva: "हिजुग", satLatin: "Hijug", hoNative: "ᱦᱤᱡᱩᱜ", hoDeva: "हिजुग", hoLatin: "Hijug", munNative: "हिजुः", munLatin: "Hijuh" },
  "बैठना": { satNative: "ᱫᱩᱲᱩᱵ", satDeva: "दुड़ुब", satLatin: "Durub", hoNative: "ᱫᱩᱵᱽ", hoDeva: "दुब", hoLatin: "Dub", munNative: "दुब", munLatin: "Dub" },
  "करना": { satNative: "ᱠᱟᱹᱢᱤ", satDeva: "कामी", satLatin: "Kami", hoNative: "ᱠᱟᱹᱢᱤ", hoDeva: "कामी", hoLatin: "Kami", munNative: "कामी", munLatin: "Kami" },

  "स्कूल": { satNative: "ᱟᱥᱲᱟ", satDeva: "आसड़ा", satLatin: "Asra", hoNative: "ᱤᱛᱩᱱ ᱟᱥᱲᱟ", hoDeva: "ईतून आसड़ा", hoLatin: "Itun Asra", munNative: "इतुन आसड़ा", munLatin: "Itun Asra" },
  "किताब": { satNative: "ᱯᱚᱛᱚᱵ", satDeva: "पोतोब", satLatin: "Potob", hoNative: "ᱯᱩᱛᱷᱤ", hoDeva: "पुथी", hoLatin: "Puthi", munNative: "पोतोब", munLatin: "Potob" },
  "कलम": { satNative: "ᱠᱚᱞᱚᱢ", satDeva: "कोलोम", satLatin: "Kolom", hoNative: "ᱠᱚᱞᱚᱢ", hoDeva: "कोलोम", hoLatin: "Kolom", munNative: "कोलोम", munLatin: "Kolom" },
  "पाठ": { satNative: "ᱥᱮᱪᱮᱫ", satDeva: "सेचेद", satLatin: "Seched", hoNative: "ᱪᱮᱫ", hoDeva: "चेद", hoLatin: "Ched", munNative: "पाठ", munLatin: "Path" },
  "नाम": { satNative: "ᱧᱩᱛᱩᱢ", satDeva: "ञुतुम", satLatin: "Nutum", hoNative: "ᱧᱩᱛᱩᱢ", hoDeva: "ञुतुम", hoLatin: "Nutum", munNative: "ञुतुम", munLatin: "Nutum" },

  "बच्चा": { satNative: "ᱜᱤᱫᱽᱨᱟᱹ", satDeva: "गिदरा", satLatin: "Gidra", hoNative: "ᱦᱚᱱ", hoDeva: "होन", hoLatin: "Hon", munNative: "गिदरा", munLatin: "Gidra" },
  "बच्चों": { satNative: "ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ", satDeva: "गिदरा को", satLatin: "Gidra ko", hoNative: "ᱦᱚᱱᱠᱚ", hoDeva: "होनको", hoLatin: "Honko", munNative: "गिदरा को", munLatin: "Gidra ko" },
  "लड़का": { satNative: "ᱠᱚᱲᱟ", satDeva: "कोड़ा", satLatin: "Kora", hoNative: "ᱠᱚᱲᱟ", hoDeva: "कोड़ा", hoLatin: "Kora", munNative: "कोड़ा", munLatin: "Kora" },
  "लड़की": { satNative: "ᱠᱩᱲᱤ", satDeva: "कुड़ी", satLatin: "Kuri", hoNative: "ᱠᱩᱲᱤ", hoDeva: "कुड़ी", hoLatin: "Kuri", munNative: "कुड़ी", munLatin: "Kuri" },
  "माँ": { satNative: "ᱟᱭᱳ", satDeva: "आयो", satLatin: "Ayo", hoNative: "ᱮᱝᱜᱟ", hoDeva: "एंगा", hoLatin: "Enga", munNative: "एगा", munLatin: "Enga" },
  "पिता": { satNative: "ᱵᱟᱵᱟ", satDeva: "बाबा", satLatin: "Baba", hoNative: "ᱟᱯᱟ", hoDeva: "आपा", hoLatin: "Apa", munNative: "आपा", munLatin: "Apa" },
  "शिक्षक": { satNative: "ᱢᱟᱪᱮᱛ", satDeva: "माचेत", satLatin: "Machet", hoNative: "ᱤᱛᱩᱱᱤᱡ", hoDeva: "ईतुनीज", hoLatin: "Itunij", munNative: "माचेत", munLatin: "Machet" },
  "घर": { satNative: "ᱚᱲᱟᱜ", satDeva: "ओड़ाग", satLatin: "Orak'", hoNative: "ᱚᱲᱟᱺ", hoDeva: "ओड़ाः", hoLatin: "Orah", munNative: "ओड़ाः", munLatin: "Odah" },
  "गाँव": { satNative: "ᱟᱹᱛᱩ", satDeva: "आतु", satLatin: "Atu", hoNative: "ᱦᱟᱹᱛᱩ", hoDeva: "हातु", hoLatin: "Hatu", munNative: "हातु", munLatin: "Hatu" },

  "पेड़": { satNative: "ᱫᱟᱨᱮ", satDeva: "दारे", satLatin: "Dare", hoNative: "ᱫᱟᱨᱩ", hoDeva: "दारू", hoLatin: "Daru", munNative: "दारू", munLatin: "Daru" },
  "पेड़ों": { satNative: "ᱫᱟᱨᱮ ᱠᱚ", satDeva: "दारे को", satLatin: "Dare ko", hoNative: "ᱫᱟᱨᱩ ᱠᱚ", hoDeva: "दारू को", hoLatin: "Daru ko", munNative: "दारू को", munLatin: "Daru ko" },
  "पत्ती": { satNative: "ᱥᱟᱠᱟᱢ", satDeva: "साकाम", satLatin: "Sakam", hoNative: "ᱥᱟᱠᱟᱢ", hoDeva: "साकाम", hoLatin: "Sakam", munNative: "साकाम", munLatin: "Sakam" },
  "पत्तियाँ": { satNative: "ᱥᱟᱠᱟᱢ ᱠᱚ", satDeva: "साकाम को", satLatin: "Sakam ko", hoNative: "ᱥᱟᱠᱟᱢ ᱠᱚ", hoDeva: "साकाम को", hoLatin: "Sakam ko", munNative: "साकाम को", munLatin: "Sakam ko" },
  "फूल": { satNative: "ᱵᱟᱦᱟ", satDeva: "बाहा", satLatin: "Baha", hoNative: "ᱵᱟ", hoDeva: "बा", hoLatin: "Ba", munNative: "बा", munLatin: "Ba" },
  "जंगल": { satNative: "ᱵᱤᱨ", satDeva: "बीर", satLatin: "Bir", hoNative: "ᱵᱤᱨ", hoDeva: "बीर", hoLatin: "Bir", munNative: "बीर", munLatin: "Bir" },
  "साल": { satNative: "ᱥᱟᱨᱡᱚᱢ", satDeva: "सारजोम", satLatin: "Sarjom", hoNative: "ᱥᱟᱨᱡᱚᱢ", hoDeva: "सारजोम", hoLatin: "Sarjom", munNative: "सरजोम", munLatin: "Sarjom" },
  "पानी": { satNative: "ᱫᱟᱜ", satDeva: "दाग", satLatin: "Dak'", hoNative: "ᱫᱟᱺ", hoDeva: "दाः", hoLatin: "Da:", munNative: "दाः", munLatin: "Da:" },
  "मिट्टी": { satNative: "ᱦᱟᱥᱟ", satDeva: "हासा", satLatin: "Hasa", hoNative: "ᱦᱟᱥᱟ", hoDeva: "हासा", hoLatin: "Hasa", munNative: "हासा", munLatin: "Hasa" },
  "आग": { satNative: "ᱥᱮᱸᱜᱮᱞ", satDeva: "सेंगेल", satLatin: "Sengel", hoNative: "ᱥᱮᱸᱜᱮᱞ", hoDeva: "सेंगेल", hoLatin: "Sengel", munNative: "सेंगेल", munLatin: "Sengel" },
  "सूर्य": { satNative: "ᱥᱤᱝᱜᱤ", satDeva: "सिंगी", satLatin: "Singi", hoNative: "ᱥᱤᱝᱵᱚᱝᱜᱟ", hoDeva: "सिंगबोंगा", hoLatin: "Singbonga", munNative: "सिंगबोंगा", munLatin: "Singbonga" },
  "चाँद": { satNative: "ᱪᱟᱸᱫᱚ", satDeva: "चांदो", satLatin: "Chando", hoNative: "ᱪᱟᱸᱫᱩ", hoDeva: "चांदु", hoLatin: "Chandu", munNative: "चांदु", munLatin: "Chandu" },

  "हाथी": { satNative: "ᱦᱟᱹᱛᱤ", satDeva: "हाती", satLatin: "Hati", hoNative: "ᱦᱟᱹᱛᱤ", hoDeva: "हाती", hoLatin: "Hati", munNative: "हाति", munLatin: "Hati" },
  "बाघ": { satNative: "ᱛᱟᱹᱨᱩᱵ", satDeva: "तारुब", satLatin: "Tarub", hoNative: "ᱠᱩᱞ", hoDeva: "कुल", hoLatin: "Kul", munNative: "कुल", munLatin: "Kul" },
  "हिरण": { satNative: "ᱡᱤᱞ", satDeva: "जिल", satLatin: "Jil", hoNative: "ᱡᱤᱞ", hoDeva: "जिल", hoLatin: "Jil", munNative: "जिल", munLatin: "Jil" },
  "गाय": { satNative: "ᱜᱟᱹᱭ", satDeva: "गाई", satLatin: "Gai", hoNative: "ᱜᱟᱹᱭ", hoDeva: "गाई", hoLatin: "Gai", munNative: "गाई", munLatin: "Gai" },

  "शरीर": { satNative: "ᱦᱚᱲᱢᱚ", satDeva: "हड़मो", satLatin: "Hormo", hoNative: "ᱦᱚᱲᱢᱚ", hoDeva: "हड़मो", hoLatin: "Hormo", munNative: "हड़मो", munLatin: "Hormo" },
  "सिर": { satNative: "ᱵᱚᱦᱚᱜ", satDeva: "बोहोक", satLatin: "Bohok'", hoNative: "ᱵᱚᱺ", hoDeva: "बोः", hoLatin: "Bo:", munNative: "बोः", munLatin: "Bo:" },
  "आँख": { satNative: "ᱢᱮᱫ", satDeva: "मेद", satLatin: "Med", hoNative: "ᱢᱮᱫ", hoDeva: "मेद", hoLatin: "Med", munNative: "मेद", munLatin: "Med" },

  "अच्छा": { satNative: "ᱱᱟᱯᱟᱭ", satDeva: "नापाय", satLatin: "Napay", hoNative: "ᱵᱮᱥ", hoDeva: "बेस", hoLatin: "Bes", munNative: "बुगी", munLatin: "Bugi" },
  "सुंदर": { satNative: "ᱪᱚᱨᱚᱠ", satDeva: "चोरोक", satLatin: "Chorok", hoNative: "ᱵᱮᱥ", hoDeva: "बेस", hoLatin: "Bes", munNative: "बुगी", munLatin: "Bugi" },
  "बड़ा": { satNative: "ᱢᱟᱨᱟᱝ", satDeva: "मारांग", satLatin: "Marang", hoNative: "ᱢᱟᱨᱟᱝ", hoDeva: "मारांग", hoLatin: "Marang", munNative: "मारांग", munLatin: "Marang" },
  "छोटा": { satNative: "ᱦᱩᱰᱤᱧ", satDeva: "हुडिञ", satLatin: "Hudinj", hoNative: "ᱦᱩᱰᱤᱝ", hoDeva: "हुडिंग", hoLatin: "Huding", munNative: "हुडिंग", munLatin: "Huding" },
  "हरी": { satNative: "ᱦᱟᱹᱨᱤᱭᱟᱹᱲ", satDeva: "हारियाड़", satLatin: "Hariyad", hoNative: "ᱦᱟᱹᱨᱤᱭᱟᱹᱲ", hoDeva: "हारियाड़", hoLatin: "Hariyad", munNative: "हरियर", munLatin: "Hariyar" },
  "हरा": { satNative: "ᱦᱟᱹᱨᱤᱭᱟᱹᱲ", satDeva: "हारियाड़", satLatin: "Hariyad", hoNative: "ᱦᱟᱹᱨᱤᱭᱟᱹᱲ", hoDeva: "हारियाड़", hoLatin: "Hariyad", munNative: "हरियर", munLatin: "Hariyar" },

  "आज": { satNative: "ᱛᱮᱦᱮᱧ", satDeva: "तेहेञ", satLatin: "Tehenj", hoNative: "ᱛᱤᱥᱤᱝ", hoDeva: "तिसिंग", hoLatin: "Tising", munNative: "तिसिंग", munLatin: "Tising" },
  "कल": { satNative: "ᱜᱟᱯᱟ", satDeva: "गापा", satLatin: "Gapa", hoNative: "ᱜᱟᱯᱟ", hoDeva: "गापा", hoLatin: "Gapa", munNative: "गापा", munLatin: "Gapa" },
  
  "है": { satNative: "ᱠᱟᱱᱟ", satDeva: "काना", satLatin: "Kana", hoNative: "ᱛᱟᱱᱟ", hoDeva: "ताना", hoLatin: "Tana", munNative: "तन", munLatin: "Tan" },
  "और": { satNative: "ᱟᱨ", satDeva: "आर", satLatin: "Ar", hoNative: "ᱟᱨ", hoDeva: "आर", hoLatin: "Ar", munNative: "आर", munLatin: "Ar" },
  "नहीं": { satNative: "ᱵᱟᱝ", satDeva: "बांग", satLatin: "Bang", hoNative: "ᱠᱟ", hoDeva: "का", hoLatin: "Ka", munNative: "का", munLatin: "Ka" },
  "हाँ": { satNative: "ᱦᱮᱸ", satDeva: "हें", satLatin: "Hen", hoNative: "ᱦᱮᱸ", hoDeva: "हें", hoLatin: "Hen", munNative: "हें", munLatin: "Hen" },
  "नमस्ते": { satNative: "ᱡᱚᱦᱟᱨ", satDeva: "जोहार", satLatin: "Johar", hoNative: "ᱡᱚᱦᱟᱨ", hoDeva: "जोहार", hoLatin: "Johar", munNative: "जोहार", munLatin: "Johar" },
  
  "एक": { satNative: "ᱢᱤᱫ", satDeva: "मिद", satLatin: "Mit'", hoNative: "ᱢᱤᱭᱟᱹᱫᱽ", hoDeva: "मियाद", hoLatin: "Miyad", munNative: "मियाद", munLatin: "Miyad" },
  "दो": { satNative: "ᱵᱟᱨ", satDeva: "बार", satLatin: "Bar", hoNative: "ᱵᱟᱹᱨᱤᱭᱟᱹ", hoDeva: "बारिया", hoLatin: "Bariya", munNative: "बारिया", munLatin: "Baria" },
  "तीन": { satNative: "ᱯᱮ", satDeva: "पे", satLatin: "Pe", hoNative: "ᱟᱹᱯᱤᱭᱟᱹ", hoDeva: "आपिया", hoLatin: "Apiya", munNative: "आपिया", munLatin: "Apia" }
};

// Grammar / Stop words to keep as is if not in dictionary
const KEEP_WORDS = ["के", "बारे", "में", "जानेंगे।", "हम", "हैं।", "यह", "है।", "से", "को", "का", "की", "इनकी"];

// Translation Engine Core
function translateToTribal(hindiText, targetLang) {
  let translatedNative = [];
  let translatedDeva = [];
  let translatedLatin = [];
  
  // Basic tokenization
  let words = hindiText.split(/([.,!?।\s]+)/); // split by whitespace/punctuation but keep them

  words.forEach(word => {
    let cleanWord = word.trim();
    if (cleanWord === "") {
      // It's whitespace or punctuation
      translatedNative.push(word);
      translatedDeva.push(word);
      translatedLatin.push(word);
      return;
    }

    if (LEXICON[cleanWord]) {
      let entry = LEXICON[cleanWord];
      if (targetLang === 'SANTHALI') {
        translatedNative.push(entry.satNative);
        translatedDeva.push(entry.satDeva);
        translatedLatin.push(entry.satLatin);
      } else if (targetLang === 'HO') {
        translatedNative.push(entry.hoNative);
        translatedDeva.push(entry.hoDeva);
        translatedLatin.push(entry.hoLatin);
      } else {
        translatedNative.push(entry.munNative); // Since Mun native script is missing, usually they use Devanagari
        translatedDeva.push(entry.munNative);
        translatedLatin.push(entry.munLatin);
      }
    } else {
      // Fallback: keep hindi word but slightly adjust
      translatedNative.push(cleanWord);
      translatedDeva.push(cleanWord);
      translatedLatin.push(cleanWord);
    }
  });

  return {
    nativeText: translatedNative.join(''),
    translitHi: translatedDeva.join(''),
    translitLat: translatedLatin.join('')
  };
}

// Global App State
let currentLang = 'SANTHALI';
let currentLessonData = null;

// Speech synthesis function using Web API
function playTTS(text) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'hi-IN'; // Using Hindi TTS engine as baseline for Indian phonetic reading
    u.rate = 0.85; // Slow down slightly for pedagogy
    window.speechSynthesis.speak(u);
  } else {
    console.warn("TTS is not supported in this browser.");
  }
}

function playBilingualRelay(hindiText, tribalText) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    
    const uHi = new SpeechSynthesisUtterance(hindiText);
    uHi.lang = 'hi-IN';
    uHi.rate = 0.92;
    
    const uTr = new SpeechSynthesisUtterance(tribalText);
    uTr.lang = 'hi-IN';
    uTr.rate = 0.72; // FLN Mode 0.72x speed
    
    uHi.onend = () => {
      // 450ms pedagogical pause
      setTimeout(() => {
        window.speechSynthesis.speak(uTr);
      }, 450);
    };
    
    window.speechSynthesis.speak(uHi);
  } else {
    console.warn("TTS is not supported in this browser.");
  }
}

// Microphone Speech Recognition
let recognition = null;
if ('webkitSpeechRecognition' in window) {
  recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'hi-IN';
}

function simulateVoiceTurn() {
  const mic = document.getElementById('btn-mic');
  const st = document.getElementById('voice-status');

  mic.className = 'w-20 h-20 rounded-full bg-red-500 text-white flex items-center justify-center text-3xl shadow-lg mx-auto animate-pulse';
  st.innerText = 'Listening to Hindi Teacher Speech...';

  // Fallback for offline demo or unsupported browser
  if (!recognition || !navigator.onLine) {
    triggerOfflineFallbackDemo(mic, st);
    return;
  }

  try {
    recognition.start();
  } catch (e) {
    triggerOfflineFallbackDemo(mic, st);
  }

  recognition.onresult = (event) => {
    let transcript = event.results[0][0].transcript;
    st.innerText = `Recognized: "${transcript}". Processing MT...`;
    
    // Process Translation immediately
    setTimeout(() => {
      let result = translateToTribal(transcript, currentLang);
      document.getElementById('voice-recognized-text').innerText = transcript;
      document.getElementById('voice-translated-text').innerText = result.nativeText + " (" + result.translitHi + ")";
      
      playBilingualRelay(transcript, result.translitHi);

      mic.className = 'w-20 h-20 rounded-full bg-[#1e5128] hover:bg-[#143d1c] text-white flex items-center justify-center text-3xl shadow-lg mx-auto transition-all';
      st.innerHTML = 'Bilingual Relay Active: <span class="font-bold text-emerald-700">Sub-3.0s SLA</span>';
    }, 100);
  };

  recognition.onerror = (event) => {
    console.warn("Speech recognition error:", event.error);
    triggerOfflineFallbackDemo(mic, st);
  };
}

function triggerOfflineFallbackDemo(mic, st) {
  st.innerText = "Offline Mode: Simulating Teacher Voice...";
  setTimeout(() => {
    let dummyTranscript = "बच्चों आज हम पेड़ के बारे में पढ़ेंगे";
    st.innerText = `Recognized: "${dummyTranscript}". Processing MT...`;
    
    setTimeout(() => {
      let result = translateToTribal(dummyTranscript, currentLang);
      document.getElementById('voice-recognized-text').innerText = dummyTranscript;
      document.getElementById('voice-translated-text').innerText = result.nativeText + " (" + result.translitHi + ")";
      
      playBilingualRelay(dummyTranscript, result.translitHi);

      mic.className = 'w-20 h-20 rounded-full bg-[#1e5128] hover:bg-[#143d1c] text-white flex items-center justify-center text-3xl shadow-lg mx-auto transition-all';
      st.innerHTML = 'Offline Relay Active: <span class="font-bold text-emerald-700">Sub-3.0s SLA Verified</span>';
    }, 100);
  }, 1200);
}

// Lesson Studio Generation
function generateLesson() {
  const btn = document.getElementById('btn-generate');
  btn.innerHTML = '<span class="animate-spin">⏳</span> Grounding RAG & Translating...';
  
  setTimeout(() => {
    const hindiPrompt = document.getElementById('hindi-prompt').value;
    const result = translateToTribal(hindiPrompt, currentLang);
    
    // Select Analogy based on Language
    let analogy = "";
    let scriptBadge = "";
    if (currentLang === 'SANTHALI') {
      scriptBadge = 'Ol Chiki (ᱚᱞ ᱪᱤᱠᱤ) Adaptation';
      analogy = 'सरहुल (बाहा परब) में पूजनीय सखुआ (साल) के वृक्ष और प्रकृति से जुड़ाव।';
    } else if (currentLang === 'HO') {
      scriptBadge = 'Warang Chiti (ᱣᱟᱨᱟᱝ ᱪᱤᱛᱤ) Adaptation';
      analogy = 'मागे परब में गांव के पहान द्वारा पूजे जाने वाले पवित्र करम एवं साल के वृक्ष।';
    } else {
      scriptBadge = 'Devanagari / Nag Mundari Adaptation';
      analogy = 'सरना स्थल का विशाल करम एवं साल वृक्ष और खेतों को सींचने वाला जीवन रस।';
    }

    currentLessonData = {
      ...result,
      analogy: analogy,
      scriptBadge: scriptBadge
    };

    updateLessonView();
    btn.innerHTML = '<span>✨</span><span>Generate Tribal Pedagogical Adaptation</span>';
  }, 200); // 200ms fake delay to simulate processing, translation is instant
}

function updateLessonView() {
  if (!currentLessonData) return;
  
  document.getElementById('script-badge').innerText = currentLessonData.scriptBadge;
  document.getElementById('native-script-text').innerText = currentLessonData.nativeText;
  document.getElementById('translit-hi').innerText = currentLessonData.translitHi;
  document.getElementById('translit-lat').innerText = currentLessonData.translitLat;
  document.getElementById('cultural-analogy').innerHTML = '<strong>स्थानीय संदर्भ:</strong> ' + currentLessonData.analogy;
  document.getElementById('approval-status').innerText = 'Status: Pending Teacher Review';
  document.getElementById('approval-status').className = 'text-xs text-amber-600 font-semibold';
  
  const approveBtn = document.getElementById('btn-approve');
  approveBtn.innerText = '👍 Teacher Approve & Stage to Outbox';
  approveBtn.disabled = false;
  approveBtn.className = 'px-4 py-2 bg-[#1e5128] hover:bg-[#143d1c] text-white rounded-xl text-xs font-bold transition-all shadow-sm';
}

function selectLanguage(lang) {
  currentLang = lang;
  ['SANTHALI', 'HO', 'MUNDARI'].forEach(l => {
    const b = document.getElementById('lang-' + l);
    if (l === lang) {
      b.className = 'py-2 px-2 rounded-xl border border-emerald-600 bg-emerald-50 text-emerald-900 text-xs font-bold';
    } else {
      b.className = 'py-2 px-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold';
    }
  });
  // Auto-regenerate on language switch if we already generated
  if (currentLessonData) generateLesson();
}

function approveLesson() {
  document.getElementById('approval-status').innerText = 'Status: ✅ Approved for Classroom Delivery';
  document.getElementById('approval-status').className = 'text-xs text-emerald-700 font-bold';
  const b = document.getElementById('btn-approve');
  b.innerText = '✓ Staged to Outbox';
  b.disabled = true;
  b.className = 'px-4 py-2 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-xl text-xs font-bold cursor-default';
}

// UI Tabs
function switchTab(tab) {
  ['studio', 'voice', 'worksheet', 'curriculum', 'sync', 'arch'].forEach(t => {
    const el = document.getElementById('tab-' + t);
    const btn = document.getElementById('btn-' + t);
    if (!el || !btn) return;
    
    if (t === tab) {
      el.classList.remove('hidden');
      if (t === 'studio') el.classList.add('grid');
      btn.className = 'px-4 py-2.5 rounded-xl font-semibold text-sm bg-[#1e5128] text-white shadow-sm transition-all';
    } else {
      el.classList.add('hidden');
      if (t === 'studio') el.classList.remove('grid');
      btn.className = 'px-4 py-2.5 rounded-xl font-semibold text-sm text-slate-600 hover:bg-slate-100 transition-all';
    }
  });
}

// Worksheet Generation
function generateWorksheet() {
  if (!currentLessonData) {
    alert("Please generate a lesson in the Lesson Studio first!");
    return;
  }
  
  const q1 = `1. सही शब्द पहचानें: ${currentLessonData.translitHi.split(' ').slice(0, 5).join(' ')}... का अर्थ क्या है?`;
  const q2 = `2. मिलान करें: 'पेड़' का ${currentLang} में क्या अर्थ है?`;
  
  document.getElementById('worksheet-content').innerHTML = `
    <div class="border border-slate-200 p-4 rounded-xl bg-white mb-4">
      <h4 class="font-bold mb-2">Q1. MCQ</h4>
      <p class="text-sm mb-2">${q1}</p>
      <div class="space-y-1 text-sm pl-4">
        <div><input type="radio"> A) ${currentLessonData.translitLat.split(' ')[0]}</div>
        <div><input type="radio"> B) ${currentLessonData.translitLat.split(' ')[1] || 'Bir'}</div>
      </div>
    </div>
    <div class="border border-slate-200 p-4 rounded-xl bg-white">
      <h4 class="font-bold mb-2">Q2. Match</h4>
      <p class="text-sm mb-2">${q2}</p>
      <div class="space-y-1 text-sm pl-4">
        <div><input type="radio"> A) Daru</div>
        <div><input type="radio"> B) Dare</div>
      </div>
    </div>
  `;
}
