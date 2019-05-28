using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SignalRChat.Model;
using SignalRChat.Model.Hubs;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SignalRChat.Controllers
{
	[Route("api/[controller]")]
	public class ChatController : Controller
	{
		private readonly IHubContext<ChatHub> _hub;

		public ChatController(IHubContext<ChatHub> hub)
		{
			_hub = hub;
		}


		public IActionResult Get()
		{
			var timerManager = new TimerManager(() => _hub.Clients.All.SendAsync("transferdata", DataManager.GetData()));

			return Ok(new { Message = "Request Completed" });
		}

		//// GET: api/<controller>
		//[HttpGet]
		//public async Task<IActionResult> Get()
		//{
		//	await _hub.Clients.All.SendAsync("transferdata", "Hejsa");

		//	return Ok(new { Message = "Request Completed" });
		//}

		// GET api/<controller>/5
		[HttpGet("{id}")]
		public string Get(int id)
		{
			return "value";
		}

		// POST api/<controller>
		[HttpPost]
		public void Post([FromBody]string value)
		{
		}

		// PUT api/<controller>/5
		[HttpPut("{id}")]
		public void Put(int id, [FromBody]string value)
		{
		}

		// DELETE api/<controller>/5
		[HttpDelete("{id}")]
		public void Delete(int id)
		{
		}
	}
}
