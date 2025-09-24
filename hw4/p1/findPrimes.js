function find_primes(m, n) {
    primes = []
    for (m; m<=n; m++) {
        if (m === 2) { 
            primes.push(m)
            continue
        }
        for (let i = 2; i < m; i++) {
            if (m % i === 0) { break; }
            else if (i === m-1) { primes.push(m)}
        }
    }
    console.log("(" + primes.length + ") [" + primes + "]")
}
find_primes(1, 10)
find_primes(-1, 10)
find_primes(11, 19)
find_primes(-1, 1)
find_primes(100, 10)