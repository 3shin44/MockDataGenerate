import React, { useState } from "react";
import Typography from "@mui/material/Typography";

export default function TestPage() {
  const [state, setState] = useState({});

  return (
    <React.Fragment>
      <Typography variant="h2" gutterBottom>
        h2. Heading
      </Typography>
      <Typography variant="body1" gutterBottom>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto ratione
        fuga illo ex itaque neque odit ut rem sequi, unde eveniet similique.
        Aperiam cumque et possimus ut illum expedita optio. Fugiat debitis eaque
        quis ducimus delectus laborum laudantium eos atque nesciunt corrupti
        voluptatibus voluptatum ipsa asperiores facere voluptatem exercitationem
        incidunt a doloremque neque, maxime reiciendis eius est obcaecati natus!
        Consequatur quasi praesentium ab aspernatur laboriosam inventore nihil,
        veniam possimus corrupti itaque, illo repellat quas aperiam aliquam
        sequi maiores excepturi obcaecati necessitatibus doloribus vero nisi
        molestias quod quae. Labore placeat fugit, laudantium in accusamus
        maxime eos eligendi dolorum accusantium itaque. Sit.
      </Typography>
    </React.Fragment>
  );
}
