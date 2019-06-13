using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SignalRChartSite.Models;
using SignalRChartSite.Models.HubConfig;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SignalRChatSite.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ChartController : ControllerBase
	{
		private IHubContext<ChatHub> _hub;

		public ChartController(IHubContext<ChatHub> hub)
		{
			_hub = hub;
		}

		public IActionResult Get()
		{
			var timerManager = new TimerManager(() => _hub.Clients.All.SendAsync("transferchartdata", DataManager.GetData()));

			return Ok(new { Message = "Request Completed" });
		}
	}
}
