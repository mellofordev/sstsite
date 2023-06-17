import Head from 'next/head'
import styles from '../styles/Home.module.css'
import TopNavBarComponent from './TopNavBarComponent';
import { useRouter } from 'next/router';
import BlogCardComponent from './BlogCardComponent';
import HorizontalScrollComponent from './HorizontalScrollComponent';
import Image from 'next/image';
import { useEffect } from 'react';

export default function Home() {
  const router=useRouter();
 // testing out some animation 
  let animator=null;

  useEffect(()=>{
    animator = new IntersectionObserver((elements)=>{
      elements.forEach((items)=>{
        if(items.isIntersecting){
          items.target.childNodes.forEach((nodes)=>{
            console.log(nodes);
          })
          console.log(items.target.children);
          items.target.classList.add("show");
          items.target.classList.add("showtext");
  
        }else{
          items.target.classList.remove("show");
          items.target.classList.remove("showtext");
  
        }
      })
    })
  let get_items = document.querySelectorAll(".hidden");
  get_items.forEach((i)=>{
    animator.observe(i);
  });
  },[])

  return (
    <div className="main">
      <TopNavBarComponent/>
      <Head>
         <meta name='theme-color' color='#0000'/>
         <meta name='description' content='Sreedhar k.s, portfolio and blog,sreedhar k.s blog, sreedhar,'/>
         <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
         <title>cult a way</title>
      </Head>
      <div className={styles.mainContents}> 
      <div className={styles.largeViewer}>
        <div style={{margin:5}}>
        <h1 className={styles.titleFont} style={{textAlign:'center'}}>Cult a way</h1>
        <p className='lowerText' style={{textAlign:'center'}}>The Bogemain saga</p>
        </div>
      </div>
      <div className='hidden'>
        <div className={styles.contactFlexBox}>
            <div className={styles.shortContactViewer}>
                <h1 className={styles.contactmeFont} >This june</h1>
                <div className='hidden'>
                  <div className={styles.contactContainer}>
                      <div className={styles.contactIndividuals}>
                      <h2 className={styles.titleFont}>23</h2>
                      </div>
                      <div  className={styles.contactIndividuals}>
                      <h2 className={styles.titleFont}>24</h2>
                      </div>
                      <div  className={styles.contactIndividuals}>
                      <h2 className={styles.titleFont}>25</h2>
                      </div>
                      
                  </div>
                </div>
                <p style={{fontSize:20,fontWeight:600}}>at nishagandhi,kanakannu</p>

          
            </div>
            <div className={styles.rightContactImage}>
                <Image className={styles.contactImg} src="https://sreedbackend.pythonanywhere.com/media/postpics/sreedhar.png" width={550} height={600} style={{borderRadius:35}}/>
            </div>
        </div>
      </div>
      
      <div className={styles.shortViewer}>
      
        <div style={{marginTop:25}}>
          <HorizontalScrollComponent/>
        </div>
        <div >
           <h1 className={styles.titleFont}>Sponsors</h1>
           <div className={styles.awardsContainer}>
              <img src='https://github.blog/wp-content/uploads/2022/10/hacktoberfestbanner.jpeg' />
              <img src='https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-dsc/events/%28For%20Bevy%29%20solutionchallenge-2022-EventThumbnail_oSBXFzI.png'/>
              <img src='https://api.badgr.io/public/assertions/Mg64QqtzRmiOSjB906LZCA/image'/>
           </div>
        </div>
      
        <div>
          <h3 className={styles.titleFont}>Blog</h3>
          <BlogCardComponent/>
        </div>
        <div>
          
        </div>
        <div className='w3-row-padding-16  w3-center' style={{backgroundColor:'#242526'}}>
          <p className='w3-text-white w3-large'>cult a way</p>
          <div style={{flexDirection:'row',justifyContent:'space-between'}}>
            <a style={{marginRight:10}} href='https://www.instagram.com/sreedhar_k'><i className='fa fa-instagram' style={{fontSize:34,color:'whitesmoke'}}></i></a>
            <a style={{marginRight:10}} href='https://www.twitter.com/boywithacap'><i className='fa fa-twitter' style={{fontSize:34,color:'whitesmoke'}}></i></a>
            <a style={{marginRight:10}} href='https://www.github.com/mellofordev/'><i className='fa fa-github' style={{fontSize:34,color:'whitesmoke'}}></i></a>
          </div>
          {/* <p className='w3-text-white'>Find out my portfolio source code in github ✨</p> */}
        </div>
      </div>
      </div>
    </div>
  )
}
