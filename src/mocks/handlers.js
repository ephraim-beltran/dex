import { graphql } from "msw";

export const handlers = [
  graphql.query("TypeList", (req, res, ctx) => {
    return res(
      ctx.data({
        pokemon_v2_type: [
          { name: "MockType1", id: "1" },
          { name: "MockType2", id: "2" },
          { name: "MockType3", id: "3" },
          { name: "MockType4", id: "4" },
          { name: "MockType5", id: "5" },
        ],
      })
    );
  }),
];
