using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SignalRChartSite.Models;
using SignalRChartSite.Models.HubConfig;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SignalRChatSite.Controllers
{
	[Route("api/[controller]")]
	[Authorize]
	public class ScheduledDataController : Controller
	{
		private IHubContext<ChatHub> _hub;

		public ScheduledDataController(IHubContext<ChatHub> hub)
		{
			_hub = hub;
		}

		// POST api/<controller>
		[HttpPost]
		public void Post([FromBody]string connectionId)
		{
			string name = Context.User.Identity.Name;

			var timerManager = new TimerManager(() => _hub.Clients.Client(connectionId).SendAsync("scheduledDataProvider", DataManager.GetData()));
		}
	}
}
