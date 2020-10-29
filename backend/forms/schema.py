import graphene
from graphene import JSONString
from graphql import GraphQLError

# ## Retrieve config

# **GET /forms/config/:config_name/**

# ## Create file upload

# **PUT /forms/upload/:config_name/:file_name/**

# ## Create form response

# **PUT /forms/submit/**

class FormConfigType(graphene.ObjectType):
    field = JSONString()

class Query(graphene.ObjectType):
    form_config = graphene.Field(EnrollmentType)

    def resolve_form_config(self, info, **kwargs):
        return ""

# class Mutation(graphene.ObjectType):
#     field = 