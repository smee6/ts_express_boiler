import { Schema, model, Model } from 'mongoose';

/** 
* @swagger
*     components:
*         schemas:
*             Test:
*                 type: object
*                 required:
*                     - name
*                     - age
*                 properties:
*                     name:
*                         type: string
*                         description: 이름
*                     age:
*                         type: integer
*                         description: 나이
*/

interface TestAttribute {
    name: string;
    age: number;
}

//interface DBUserModel extends Model<User> { }

const TestSchema = new Schema<TestAttribute>({
    name: {
        type: String,
        index: true,
        unique: true,
        required: true,
    },
    age: {
        type: Number,
        required: true
    }
}, { timestamps: true });

TestSchema.set("toObject", { virtuals: true });
TestSchema.set("toJSON", { virtuals: true });

const Test = model<TestAttribute>('test', TestSchema);

export { Test, TestAttribute };