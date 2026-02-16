import exp from 'express'
import { authenticate, register } from '../services/authService.js' 
import { articleModel } from '../models/articleModel.js'
import { userModel } from '../models/userModel.js'
import { checkAuthor } from '../middllewares/checkAuthor.js'
import { verifyToken } from '../middllewares/verifiyToken.js'
export const authorRoute=exp.Router()

//Register author(public route)
authorRoute.post('/users',async(req,res)=>{
    //get user obj from req
    let userObj=req.body
    //call register
    const newUserobj = await register({...userObj,role:"AUTHOR"})
    //send res
    res.status(201).json({message:"user created",payload:newUserobj})
})

//create article
authorRoute.post("/articles",verifyToken ,checkAuthor, async (req, res) => {
  //get article from req
  let article = req.body;

  //create article document
  let newArticleDoc = new articleModel(article);
  //save
  let createdArticleDoc = await newArticleDoc.save();
  //send res
  res.status(201).json({ message: "article created", payload: createdArticleDoc });
});
//read articles(protected route)
authorRoute.get('/articles/:authorId',verifyToken,checkAuthor,async(req,res)=>{
    //get author id
    let authId=req.params.authorId
    //read the article
    let articles= await articleModel.find({author:authId,isSrticleActive:true}).populate("author","firstName email")
    //send res
    res.status(200).json({message:"Articles of author",payload:articles})
})
//edit article(protected route)
authorRoute.put('/articles',verifyToken,checkAuthor,async(req,res)=>{
    //get modified article request 
    let {articleId,title,category,content,author}=req.body
    //find article
    let articleOfDb = await articleModel.findOne({_id:articleId,author:author})
    if(!articleOfDb){
        return res.status(401).json({message:"article not found"})
    }
    //update article
    let updatedArticle = await articleModel.findByIdAndUpdate(articleId,{
        $set:{title,category,content},
    },
        {new:true},
    )
    //send res
    res.status(200).json({message:"article updated",payload: updatedArticle})
   
})
//delete(soft) article(protected route)

