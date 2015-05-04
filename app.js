var result = {};
var count = 0;
var fs = require('fs');
var origin = '';
var arrName = [];
var arrValue = [];
var strArr = '';
var numTable = {
    '0': 'không',
    '1': 'một',
    '2': 'hai',
    '3': 'ba',
    '4': 'bốn',
    '5': 'năm',
    '6': 'sáu',
    '7': 'bảy',
    '8': 'tám',
    '9': 'chín'
};

var table = {
    'à': 'af',
    'á': 'as',
    'ả': 'ar',
    'ã': 'ax',
    'ạ': 'aj',

    'â': 'aa',

    'ấ': 'aas',
    'ầ': 'aaf',
    'ẩ': 'aar',
    'ẫ': 'aax',
    'ậ': 'aaj',

    'ă': 'aw',

    'ắ': 'aws',
    'ằ': 'awf',
    'ẳ': 'awr',
    'ẵ': 'awx',
    'ặ': 'awj',

    'é': 'es',
    'è': 'ef',
    'ẻ': 'er',
    'ẽ': 'ex',
    'ẹ': 'ej',

    'ê': 'ee',

    'ế': 'ees',
    'ề': 'eef',
    'ể': 'eer',
    'ễ': 'eex',
    'ệ': 'eej',

    'í': 'is',
    'ì': 'if',
    'ỉ': 'ir',
    'ĩ': 'ix',
    'ị': 'ij',

    'đ': 'dd',

    'ó': 'os',
    'ò': 'of',
    'ỏ': 'or',
    'õ': 'ox',
    'ọ': 'oj',

    'ô': 'oo',

    'ố': 'oos',
    'ồ': 'oof',
    'ổ': 'oor',
    'ỗ': 'oox',
    'ộ': 'ooj',

    'ơ': 'ow',

    'ớ': 'ows',
    'ờ': 'owf',
    'ở': 'owr',
    'ỡ': 'owx',
    'ợ': 'owj',

    'ú': 'us',
    'ù': 'uf',
    'ủ': 'ur',
    'ũ': 'ux',
    'ụ': 'uj',

    'ư': 'uw',

    'ứ': 'uws',
    'ừ': 'uwf',
    'ử': 'uwr',
    'ữ': 'uwx',
    'ự': 'uwj',

    'ý': 'ys',
    'ỳ': 'yf',
    'ỷ': 'yr',
    'ỹ': 'yx',
    'ỵ': 'yj'


};

fs.readFile('origin', 'utf8', function(err, data) {

    //loại bỏ kí tự đặc biệt, chuyển dữ liệu về mảng
    var arrayOrigin = data
        .split('\n').join(' ')
        .split('\s').join(' ')
        .split('\w').join(' ')
        .split('\t').join(' ')
        .split('\r').join(' ')
        .split('\f').join(' ')
        .split('\b').join(' ')
        .split('\"').join(' ')
        .split('\\').join(' ')
        .split('\'').join(' ')
        .split('.').join(' ')
        .split(',').join(' ')
        .split(')').join(' ')
        .split('(').join(' ')
        .split('”').join(' ')
        .split('“').join(' ')
        .split('?').join(' ')
        .split('!').join(' ')
        .split('@').join(' ')
        .split('*').join(' ')
        .split('&').join(' ')
        .split('%').join(' ')
        .split('-').join(' ')
        .split('#').join(' ')
        .split('$').join(' ')
        .split('_').join(' ')
        .split('=').join(' ')
        .split('+').join(' ')
        .split('|').join(' ')
        .split(':').join(' ')
        .split(';').join(' ')
        .split('~').join(' ')
        .split('/').join(' ')
        .split('…').join(' ')
        .split('>').join(' ')
        .split('<').join(' ')
        .split('{').join(' ')
        .split('}').join(' ')
        .split('[').join(' ')
        .split(']').join(' ')
        .split(' ').join(' ')
        .split(' ');


    //đếm số lần xuất hiện, case-insensitive, num to word
    arrayOrigin.forEach(function(item) {
        var i = item.toLowerCase(),
            num = +item;

        if (typeof num === 'number' && !isNaN(num)) {
            for (var j = 0, n = item.length; j < n; j++) {
                if (numTable[item[j]]) {
                    if (!result[numTable[item[j]]]) {
                        result[numTable[item[j]]] = 0;
                    }
                    result[numTable[item[j]]] ++;
                }
            }
        } else {
            if (!result[i]) {
                result[i] = 0;
            }
            result[i] ++;
        }
    });

    //tách mảng key và value
    for (var x in result) {
        arrName.push(x);
        arrValue.push(result[x]);
    }

    //chuyển về không dấu 
    for (var i = 0, n = arrName.length; i < n; i++) {
        var newItem = '',
            oldItem = arrName[i];

        for (var j = 0, m = oldItem.length; j < m; j++) {
            if (table[oldItem[j]]) {
                newItem += table[oldItem[j]];
            } else {
                newItem += oldItem[j];
            }

        }
        arrName[i] = newItem.replace('uwow', 'uow'); //magic :v
    }


    //sort
    for (var i = 0, n = arrValue.length; i < n; i++) {
        for (var j = i + 1, m = arrValue.length; j < m; j++) {
            if (arrValue[i] > arrValue[j]) {
                var c = arrValue[i];
                arrValue[i] = arrValue[j];
                arrValue[j] = c;

                c = arrName[i];
                arrName[i] = arrName[j];
                arrName[j] = c;
            }
        }
    }


    // tạo dữ liệu kết quả
    // strArr += '{';
    // for (var i = 0, n = arrValue.length; i < n; i++) {
    //     var temp = '"' + arrName[i] + '":' + arrValue[i] + ',';
    //     strArr += temp;
    // }
    // strArr += '}';


    //hoang's format
    strArr += '[';
    for (var i = arrValue.length - 1; i >= 0; i--) {
        strArr += '"' + arrName[i] + '",\n';
    }
    strArr += ']';

    //xuất ra file
    fs.writeFile('result', strArr);
});



// console.log(arrayOrigin);