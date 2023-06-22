exports.handler = async (event, context) => {
  try {
    const data = {
      message: "Hello, World!",
      timestamp: new Date().getTime(),
    };

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
