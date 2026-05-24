import { Schema, model } from 'mongoose'

const categoryschema = new Schema({})

export const Category = model('category', categoryschema)
