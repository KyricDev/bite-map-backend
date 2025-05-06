import { Request, Response } from "express";
import OpenAI from 'openai';
import {z} from 'zod';
import { zodResponseFormat} from "openai/helpers/zod";

const LocationQueryResponseFormat = z.object({
    query: z.string({
        description: 'venue name, category, contact information, cuisine/taste',
    }),
    radius: z.number({
        description: 'search distance in meters. Can be 0 to 100000. Can interpret from words like \"near\" or \"far\"'
    }),
    categories: z.string({
        description:'cuisine type/origin',
    }),
    minPrice: z.number({
        description: 'minimum price from 1 (most affordable) to 4 (most expensive)',
    }),
    maxPrice: z.number({
        description: 'maximum price from 1 (most affordable) to 4 (most expensive)',
    }),
    // openAt: z.string({
    //     description: 'opening hours in DOWTHHMM format where DOW is the day number 1-7 (Monday = 1, Sunday = 7) and time is in 24 hour format',
    // }),
    dow: z.number({
        description: 'day of the week. values from 1-7  where Monday = 1, Sunday = 7, etc.'
    }),
    time: z.number({
        description: 'time of the day in HHMM 24 hour format.'
    }),
    openNow: z.boolean({
        description:'indicate if user requests that the location is open now. boolean'    
    }),
    near: z.string({
        description: 'A string naming a locality in the world (e.g., \"Chicago, IL\"). Must be state and/or city can be null if not specified.',
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
  

interface ParsedLocationDescription {
    query: string,
    radius: number,
    categories: string,
    minPrice: number,
    maxPrice: number,
    // openAt: string,
    dow: number,
    time: number,
    openNow: boolean,
    near: string,
}

abstract class OpenAIService {
    static async parseLocationDescription(req: Request, res: Response): Promise<ParsedLocationDescription | null> {
        const openAI = new OpenAI();
        const response = await openAI.beta.chat.completions.parse({
            model: 'gpt-4.1-mini',
            messages: [
                {
                    role: 'system',
                    content: "parse location information"
                },
                {
                    role: 'user',
                    content: 'expensive ramen near me that is open on Monday 8PM and is in Tanza',
                },
            ],
            response_format: zodResponseFormat(LocationQueryResponseFormat, "place_request")
        });

        return response.choices[0].message.parsed;
    }
}

export {
    OpenAIService
}