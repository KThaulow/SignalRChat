using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SignalRChartSite.Models;
using SignalRChartSite.Models.HubConfig;
using SignalRChatSite.Models.Chat;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SignalRChatSite.Controllers
{
	[Route("api/[controller]")]
	public class ChatController : ControllerBase
	{
		private IHubContext<ChartHub> _hub;

		public ChatController(IHubContext<ChartHub> hub)
		{
			_hub = hub;
		}

		// GET: api/<controller>
		[HttpGet]
		public IEnumerable<string> Get()
		{
			return new string[] { "value1", "value2" };
		}

		// GET api/<controller>/5
		[HttpGet("{id}")]
		public string Get(int id)
		{
			return "value";
		}

		// POST api/<controller>
		[HttpPost("SendMessage")]
		public async Task SendMessage([FromBody]SenderChatMessage chatMessage)
		{
			Console.WriteLine($"{chatMessage.Sender}-{chatMessage.Receiver}-{DateTime.UtcNow}-{chatMessage.Message}");

			var message = new ReceiverChatMessage()
			{
				Sender = chatMessage.Sender,
				Receiver = chatMessage.Receiver,
				Message = chatMessage.Message + " - by server",
				TimeStamp = DateTime.UtcNow
			};

			Thread.Sleep(1000); // Remove when finish testing

			// Send message to receiver only and add timestamp
			await _hub.Clients.All.SendAsync("chatmessage", message);
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
