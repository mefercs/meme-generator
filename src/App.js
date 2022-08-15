import React,{useEffect, useState} from 'react' 
import './App.css'
import memes from './data/memes'

export default function App(){
  const [image, setImage] = useState('')
  const [allMemes, setAllMemes] = useState([])
  const [text, setText] = useState({
    upper:'',
    bottom:''
  })
  const [showWidth, setShowWidth] = useState("")
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(()=>{
    console.log('Components mounted');
    let memesLength = memes.data.memes.length
    let randomIndex = Math.floor(Math.random()*memesLength)
    setImage(memes.data.memes[randomIndex].url)
    fetch(`https://api.imgflip.com/get_memes`).then(res=> res.json()).then(data => setAllMemes(data.data.memes.map( e=> e.url )))

    function windowWatcher(){
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize', windowWatcher)
    return function () {
      window.removeEventListener('resize',windowWatcher)
      
    }
  
  },[])

  function selectRandomImage(){
    let memesLength = memes.data.memes.length
    let randomIndex = Math.floor(Math.random()*memesLength)
    setImage(memes.data.memes[randomIndex].url)
  }
  function handleText(event){
    const {name,value} = event.target
    setText(p =>{
      return {
        ...p, 
        [name]:value
      }
    })
  }
  function handleToggle(){
    console.log('clicked');
    setShowWidth(p => { return p==='' ? 'true':''})
  }

  return <div className="main">
    <Navbar/>
    <button onClick={handleToggle}>Toggle window tracker</button>
    {showWidth && <h1>Window width: {windowWidth}</h1>}
    <Form selectRandomImage={selectRandomImage} handleText={handleText} upper={text.upper} bottom={text.bottom}/>
    <Image image={image} upper={text.upper} bottom={text.bottom}/>
  </div>
}

function Navbar(){
  return <nav className='navbar'>
    <h1>Meme Generator</h1>
    <p>MEFERCS</p>
  </nav>
}

function Form(props){
  const {selectRandomImage, handleText, upper,bottom}=props
  return <div className='form'>
    <input type="text" value={upper} name="upper" placeholder='upper' onChange={handleText}/>
    <input type="text" value={bottom} name="bottom" placeholder='bottom' onChange={handleText}/>
    <button type="submit" onClick={selectRandomImage}>Generate new image template</button>
  </div>
}

function Image(props) {
  const {image, upper,bottom} = props
  return <div className='image'>
    <h1 className='upper'>{upper}</h1>
    <img src={image} alt="random meme"/>
    <h1 className='bottom'>{bottom}</h1>
  </div>  
}

  

