const literallyAnyFunction = () => {
    console.log('f has been called!')
    return 'a string'
}


const refactoredFactorial = f => n => n === 0 ? 1 : n * f(n - 1);

const recFactorial = g => (f => n => n === 0 ? 1 : n * f(n - 1))(g(g));


// f fixpoint = Y f
// fixpoint = f fixpoint
// Y f = fixpoint = f(Y(f))
// Y f = f(Y(f))
// Y f = f(f(Y(f)))
// Y f = f(f(f(Y(f))))
//

const y = f => f(y(f))


console.log(recFactorial(recFactorial)(5))
