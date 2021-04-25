scene.onOverlapTile(SpriteKind.Player, assets.tile`tile4`, function (sprite, location) {
    startNextLevel()
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.vy = -150
})
function startNextLevel () {
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        value.destroy()
    }
    currentLevel += 1
    if (currentLevel == 1) {
        tiles.setTilemap(tilemap`level01`)
    } else if (currentLevel == 2) {
        tiles.setTilemap(tilemap`platformer1`)
    } else {
        game.over(true)
    }
    mySprite = sprites.create(img`
        . . 4 4 4 . . . . 4 4 4 . . . . 
        . 4 5 5 5 e . . e 5 5 5 4 . . . 
        4 5 5 5 5 5 e e 5 5 5 5 5 4 . . 
        4 5 5 4 4 5 5 5 5 4 4 5 5 4 . . 
        e 5 4 4 5 5 5 5 5 5 4 4 5 e . . 
        . e e 5 5 5 5 5 5 5 5 e e . . . 
        . . e 5 f 5 5 5 5 f 5 e . . . . 
        . . f 5 5 5 4 4 5 5 5 f . . f f 
        . . f 4 5 5 f f 5 5 6 f . f 5 f 
        . . . f 6 6 6 6 6 6 4 4 f 5 5 f 
        . . . f 4 5 5 5 5 5 5 4 4 5 f . 
        . . . f 5 5 5 5 5 4 5 5 f f . . 
        . . . f 5 f f f 5 f f 5 f . . . 
        . . . f f . . f f . . f f . . . 
        `, SpriteKind.Player)
    controller.moveSprite(mySprite, 100, 0)
    mySprite.ay = 500
    scene.cameraFollowSprite(mySprite)
    tiles.placeOnRandomTile(mySprite, assets.tile`tile3`)
    for (let value of tiles.getTilesByType(assets.tile`tile5`)) {
        myEnemy = sprites.create(img`
            ..............eeeeeee...........
            ............ee455662e2e.........
            ..........ee45556723e2688.......
            .........e46776677232e777668....
            ........e46745554772227776778...
            .......4448744444777766777678...
            ......4522e7777776777766676668..
            .....4523227766722e666eeeee888..
            ....455232e76672322e4555dddd48..
            ...44567777554623e455ddddddddd4.
            ...e66774554477e455dddd55554dd44
            ..e46777444677e55dd55555d55dddd4
            ..e5668677666e5dd555555555555dde
            .e45544e8776e5d555554555555555de
            .e554eeee66e5d5555d55555dddd54de
            .e55ee44fee5d5d555555d5d5dddddde
            e454eeeefe45d55555555555dd4ddde.
            e5e4eefffe5d55555555d5555dddde..
            e5ee4eeff45d555555555555dddde...
            e5eeeeffe5d55d555d5555d5ddde....
            e5ffefeee5d55545555555ddd4e.....
            e5ffffffe545555555d5d4ddee......
            e54efeff45d55d55555dddde........
            e5eeeffe5dd5555545dddee.........
            e4eeefff5d5555d55ddde...........
            e4efefff5d5d55555d4e............
            .e4efffe5d555555dee.............
            .e54eeee5d545dd4e...............
            ..e554ee5dddddee................
            ...ee5544dddee..................
            .....eeeeeee....................
            ................................
            `, SpriteKind.Enemy)
        tiles.placeOnTile(myEnemy, value)
        myEnemy.follow(mySprite, 30)
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile2`, function (sprite, location) {
    game.over(false)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    if (sprite.bottom < otherSprite.y) {
        sprite.vy = -100
    } else {
        info.changeLifeBy(-1)
    }
})
let myEnemy: Sprite = null
let currentLevel = 0
let mySprite: Sprite = null
scene.setBackgroundColor(11)
startNextLevel()
