const formatNumber = number => {
    number = Math.round(number*100)/100;
    if(number<0) {number=number+'';} else {number=' '+number;}
    number = number+'.00'.substr(0,5-number.length);
    return(number);
}

export default formatNumber;