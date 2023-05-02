$(function () {
    var paraCount = 0

    $.get('http://localhost:3000/paras',function (data) {
        paraCount = data.length
        data.forEach(p =>{
            $("#paraList").append("<li><b>"+p.dateTime+"</b>:"+p.p+"</li>")
        })
    }).fail (function (error) {
        alert('Error: '+JSON.stringify(error))
    })

    $("#addPara").click(function () {
        var d = new Date();
        var timestamp = d.toISOString().substring(0,16)
        $("#paraList").append("<li><b>"+timestamp+"</b>:"+$("#paraText").val()+"</li>")

        paraCount ++
        var newPara ={
            id: "p"+paraCount,
            dateTime:timestamp,
            p:$("#paraText").val()
        }

        $.post('http://localhost:3000/paras',newPara,function (response) {
            alert('Record inserted: '+JSON.stringify(response))
        }).fail (function (error) {
            alert('Error: '+JSON.stringify(error))
        })

    })
})