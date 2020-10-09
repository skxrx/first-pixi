let Application = PIXI.Application,
    Container = PIXI.Container,
    Sprite = PIXI.Sprite,
    Text = PIXI.Text,
    TextStyle = PIXI.TextStyle,
    loader = PIXI.loader,
    resources = PIXI.loader.resources


let app = new Application({
    width: 1200,
    height: 848,
    antialias: true,
})

document.body.appendChild(app.view)

let state, scoreBar, value = 0, score, target, 
    id, bg, gameScene, timer = 10, targetClick = true

loader
    .add('../assets/sprites/atlas.json')
    .load(setup)

function setup(){
    id = resources["../assets/sprites/atlas.json"].textures

    gameScene = new Container()
    app.stage.addChild(gameScene)

    bg = new Sprite(id['space.jpg'])
    bg.anchor.set(0, 0)
    gameScene.addChild(bg)

    scoreBar = new Container()
    scoreBar.position.set(app.stage.width / 4, 65)
    gameScene.addChild(scoreBar)

    let bgScoreBar = new Sprite(id['clear_score.png'])
    scoreBar.addChild(bgScoreBar)

    let style= new TextStyle({
        fontFamily: "Space Mono",
        fontSize: 24,
        fill: "black"
    })

    score = new Text("0", style)
    score.x = scoreBar.width / 1.7
    score.y = Math.floor(scoreBar.height / 7.3)
    scoreBar.addChild(score)
    
    score.rotation = -0.18

    target = new Sprite(id['rocket.png'])

    target.x = gameScene.width / 1.8
    target.y = gameScene.height / 1.7

    target.interactive = true
    target.buttonMode = true

    target.on('pointerdown', handlerClick)
    gameScene.addChild(target)

    state = play

    app.ticker.add(delta => {
        gameLoop(delta)
    })
}

function gameLoop(delta){
    state(delta)
}

function play(){
    if (timer == 0){
        targetClick = true

        target.scale.x = 1
        target.scale.y = 1
    } else if (timer > 0) {
        timer--
    }
}
 
function handlerClick(){
    if(targetClick){
        value++
        score.text = value

        target.scale.x = 0.95 
        target.scale.y = 0.95 

        score.x = scoreBar.width / 1.7
        score.y = Math.floor(scoreBar.height / 7.3)

        targetClick = false
        timer = 10
    }
}