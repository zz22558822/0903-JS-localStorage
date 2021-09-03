// 指定 DOM 元素
var btn = document.querySelector('.btn');
var text = document.querySelector('.text');
var list = document.querySelector('.list');
    // 宣告 data 為字串轉成陣列格式的 localStorage 內 listData資料 ||是如果沒有此資料 則代為[] 空陣列
var data = JSON.parse(localStorage.getItem('listData')) || [];


// 監聽與更新

    // 監聽是否按下新增 如果有就執行 addData
btn.addEventListener('click',addData,false);
    // 監聽是否按下列表 如果有就執行 delData
list.addEventListener('click',delData,false);
    // 更新資料顯示
updataList(data);


// 加入列表資料，並同步到localStorage中
function addData(e) {
    // 取消預設觸發行為
    e.preventDefault();
    // 判斷不可以留白
    if (text.value == '') {
        alert('請輸入要記下的事情。')
        return;
    }
    // 判斷字元不要超過25個
    if (text.value.length > 25) {
        alert('長度超過25個字元，請縮減。')
        return;
    }
    // 使用todo為 陣列 { content : 輸入框的內容 }
    var todo = {
        content : text.value
    };
    data.push(todo);
    // 更新資料顯示
    updataList(data);
    // 新增資料到 localStorage
    localStorage.setItem('listData',JSON.stringify(data));
}


// 更新 list 列表資料
function updataList(items) {
    // 新增空值 str 給予使用 innerHTML 時可以累加
    var str = '';
    // for 迴圈停止次數
    var len = data.length;
    // 迴圈增加li
    for (var i = 0; i < len; i++) {
        str += '<li><a class="li-Del" href="#" data-itenNum="' + i + '">刪除</a><span>' + items[i].content + '</span></li>';
    }
    // 使用innerHTML更新列表值
    list.innerHTML = str;
}


function delData(e) {
    //如果不是點擊 .list 內的 A連結，則回傳空值強制停止 function
    if (e.target.nodeName !== 'A') {
        return
    }
    // 刪除點擊當下的列表號碼(e.target.dataset.itenNum) , 數量1個
    data.splice(e.target.dataset.itenNum,1);
    // 更新資料顯示
    updataList(data);
    // 新增資料到 localStorage
    localStorage.setItem('listData',JSON.stringify(data));
}


