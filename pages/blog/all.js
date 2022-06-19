import BlogCardComponent from "../BlogCardComponent";
import Head from "next/head";
export default function All(){
    return(
        <div>
            <Head>
                <meta name='theme-color' color='black'/>
                <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
            </Head>
            <h1 style={{color:'white',fontSize:55,fontWeight:'bold'}}>Blog</h1>
            <BlogCardComponent/>
        </div>
    );
}