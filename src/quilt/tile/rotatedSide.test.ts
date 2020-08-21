import {rotatedSide} from "./rotatedSide";

test( "right after 3 should be bottom", () => {
    expect( rotatedSide('right', 3)).toEqual('bottom')
})

test( "left after 4 should be left", () => {
    expect( rotatedSide('left', 4)).toEqual('left')
})

test( "top after 5 should be left", () => {
    expect( rotatedSide('top', 5)).toEqual('left')
})
