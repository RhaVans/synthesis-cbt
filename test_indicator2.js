const regex2 = /\$|\\[a-zA-Z]|[a-zA-Z0-9]\^[{0-9\-]|(?:^|[^a-zA-Z])[a-zA-Z0-9]_/;
console.log(regex2.test("tkd_matdas"));
console.log(regex2.test("x_1"));
console.log(regex2.test("x^-1"));
