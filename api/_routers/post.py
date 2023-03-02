from fastapi import APIRouter, Depends, HTTPException, status
from _db import get_post_col
from _utils.id import generate_post_id
from _const import SwaggerTag
from _models.post import Post, AddPostModel

router = APIRouter()

# 카테고리를 전달받아 해당 카테고리의 데이터 가져오기
@router.get(path="",tags=[SwaggerTag.POST])
def 포스트_목록 (category:str):
  if category == "ALL":
    result = list(get_post_col().find())
  else: 
    result = list(get_post_col().find({"category": category}).sort("created_at", 1))
  # result = list(get_post_col().find({"category": category}).sort({"created_at": 1}).skip(1).limit(1))
  
  if len(result) == 0:
    raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="존재하는 데이터가 없습니다.",
        )

  return {  
      "result": result,
  }

# 같은 카테고리에 같은 제목이 있는지 확인 후 추가
@router.post(path="/create", response_description="Create a new post",  response_model=Post, tags=[SwaggerTag.POST])

def 포스트_추가(postData: AddPostModel):
  if get_post_col().find_one({"category": postData.category, "title": postData.title }):
    raise HTTPException(
      status_code=status.HTTP_409_CONFLICT,
      detail="같은 제목의 글이 이미 존재합니다."
    )
  new_post_model = Post(**postData.dict(), _id=generate_post_id())
  result = get_post_col().insert_one(new_post_model.dict(by_alias=True))

  return {  
      "_id": result.inserted_id,
      "category": new_post_model.category,
      "summary": new_post_model.summary,
      "title": new_post_model.title, 
      "content": new_post_model.content, 
      "main_image_url": new_post_model.main_image_url, 
      "created_at": new_post_model.created_at
  }

# 삭제 후엔 성공 메세지 전달
@router.delete("/delete", response_description="Delete a post", tags=[SwaggerTag.POST])
def 포스트_삭제(id: str):
  
  findData = get_post_col().find_one({"_id": id})
  if not findData:
    raise HTTPException(
      status_code=status.HTTP_409_CONFLICT,
      detail="존재하지 않는 데이터입니다."
    )
  
  get_post_col().find_one_and_delete({"_id": id})
  
  return {
    "success": True
  }