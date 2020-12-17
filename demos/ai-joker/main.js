var textPredictor = textPredictor || null;

$(document).ready(() => {
    // $('#exampleText').keyup(delay(function (e) {
    //     textPredictor.predictText();
    // }, 500));

    $('#copyText').click(function () {
        textPredictor.copyTextToInput();
        textPredictor.predictText();
    })

    $('#rerun').click(function () {
        textPredictor.predictText();
    })
})

function delay(callback, ms) {
    var timer = 0;
    return function () {
        var context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            callback.apply(context, args);
        }, ms || 0);
    };
}

textPredictor = {
    url: `https://stark-depths-11307.herokuapp.com/complete_joke`,
    predictText: () => {
        let data = textPredictor.prepareData();
        if (data.text == '') {
            textPredictor.setOutputText('');
        } else {
            $.ajax(
                {
                    data: data,
                    url: textPredictor.url,
                    type: "GET",
                    success: textPredictor.success,
                    error: textPredictor.error
                }
            );
        }
    },
    success: (data) => {
        console.log(data);
        if (data) {
            textPredictor.setOutputText(data);
        }
    },
    setOutputText: (text) => {
        $('#outputText').text(text);
    },
    error: (xhr, status, error) => {
        console.log(error);
    },
    prepareData: () => {
        let data = {
            text: textPredictor.getText()
        }
        return data;
    },
    getText: () => {
        var text = $('#exampleText').val();
        if (text)
            text = text.trim()
        return text;
    },
    copyTextToInput: () => {
        let text = $('#outputText').text();
        $('#exampleText').val(text);
    }

}