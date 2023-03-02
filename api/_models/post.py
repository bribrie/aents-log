from pydantic import BaseModel, Field
from typing import Optional

class PostBase(BaseModel):
    """
    포스트 모델
    """
    
    category:str = Field(description="카테고리")
    title:str = Field(description="제목")
    summary: str = Field(description="요약")
    content:str= Field(description="내용")
    main_image_url:str= Field(description="메인 이미지")
    created_at:str= Field(description="작성일")
    
    
class Post(PostBase):
    """
    데이터베이스 사용자 모델
    """

    id: str = Field(alias="_id", description="포스트 아이디")
    
    
class AddPostModel(BaseModel):
    """
    포스트 추가 모델
    """
    
    category:str = Field(description="카테고리")
    title:str = Field(description="제목")
    summary: str = Field(description="요약")
    content:str= Field(description="내용")
    main_image_url:str= Field(description="메인 이미지")
    created_at:str= Field(description="작성일")
