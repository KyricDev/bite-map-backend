import { Request, Response } from "express";
import OpenAI from 'openai';
import { z } from 'zod';
import { zodResponseFormat } from "openai/helpers/zod";
import { ResponseModel } from "../models/response_model";

const LocationQueryResponseFormat = z.object({
    query: z.string({
        description: 'venue name, category, contact information, type of cuisine, origin',
    }),
    radius: z.number({
        description: 'search distance in meters. Can be 0 to 100000. Can infer from words like near or far where 5000 is considered near. -1 by default'
    }),
    categories: z.string({
        description:'cuisine type/origin',
    }),
    minPrice: z.number({
        description: 'minimum price from 1 (most affordable) to 4 (most expensive). 0 if not specfied',
    }),
    maxPrice: z.number({
        description: 'maximum price from 1 (most affordable) to 4 (most expensive). 0 if not specfied',
    }),
    // openAt: z.string({
    //     description: 'opening hours in DOWTHHMM format where DOW is the day number 1-7 (Monday = 1, Sunday = 7) and time is in 24 hour format',
    // }),
    dow: z.number({
        description: 'day of the week. values from 1-7 where Monday = 1, Sunday = 7, etc. -1 if not specified'
    }),
    time: z.string({
        description: 'time of the day in HHMM 24 hour format. Return an empty string if not specified'
    }),
    openNow: z.boolean({
        description: 'user specifies that the location should be open at this time. False if not specified'    
    }),
    near: z.string({
        description: 'A string naming a locality in the world (e.g., \"Chicago, IL\"). Must be state and/or city. Return an empty string if not specified.',
    }),
})

// const ResponseFormat = {
//     type: "json_schema",
// json_schema: {
//     name: "place_request",
//     strict: false,
//     schema: {
//       type: "object",
//       properties: {
//         query: {
//           type: "string",
//           description: "venue name, category, contact information, cuisine/taste"
//         },
//         radius: {
//           type: "number",
//           description: "search distance in meters. Can be 0 to 100000. Can interpret from words like \"near\" or \"far\""
//         },
//         categories: {
//           type: "string",
//           description: "cuisine type/origin"
//         },
//         minPrice: {
//           type: "number",
//           description: "minimum price from 1 (most affordable) to 4 (most expensive)"
//         },
//         maxPrice: {
//           type: "number",
//           description: "maximum price from 1 (most affordable) to 4 (most expensive)"
//         },
//         openAt: {
//           type: "string",
//           description: "opening hours in DOWTHHMM format"
//         },
//         openNow: {
//           type: "boolean",
//           description: "indicate if user requests that the location is open now. boolean"
//         },
//         near: {
//           type: "string",
//           description: "A string naming a locality in the world (e.g., \"Chicago, IL\")"
//         }
//       },
//       required: [
//         "query"
//       ]
//     }
//   }
// }

abstract class OpenAIService {
    static async parseLocationDescription(req: Request, res: Response): Promise<ResponseModel> {
        const openAI = new OpenAI();
        const response = await openAI.beta.chat.completions.parse({
            model: 'gpt-4.1-mini',
            messages: [
                {
                    role: 'system',
                    content: 'parse location information',
                },
                {
                    role: 'user',
                    content: req.body.query,
                },
            ],
            response_format: zodResponseFormat(LocationQueryResponseFormat, "place_request")
        });

        const refusal = response.choices[0].message.refusal;
        if (refusal) {
            const responseModel = new ResponseModel();
            responseModel.data = refusal;
            responseModel.isError = true;
            return responseModel;
        }

        const responseModel = new ResponseModel();
        responseModel.data = response.choices[0].message.parsed;
        responseModel.isError = false;
        return responseModel;
    }
}

export {
    OpenAIService
}