function convert(dec) {
    let d = Number(dec)
    if ( d > 127 || d < -128) {
        console.log("Decimal Number should be in between -128 and 127!")
        return undefined
    }
    else if (d >= 0) { 
        console.log(d.toString(2).padStart(8, "0")) 
    }
    else { 
        d += 256
        console.log(d.toString(2).padStart(8, "0"))
    }
}
convert("1")
convert("-1")
convert("-15")
convert("-128")
convert("127")
convert("128")