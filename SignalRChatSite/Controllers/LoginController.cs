using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SignalRChatSite.Controllers.DTO;
using SignalRChatSite.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SignalRChatSite.Controllers
{
	[Route("api/[controller]")]
	public class LoginController : ControllerBase
	{

		private readonly IEnumerable<User> _users = new List<User>
		{
			new User {  Username = "fred", Password = "123"},
			new User {  Username = "alice", Password = "456"},
			new User {	Username = "joe", Password = "789"},
		};

		[AllowAnonymous]
		[HttpPost]
		public string Post([FromBody]User user)
		{
			if (CheckUser(user.Username, user.Password))
			{
				var token = JwtManager.GenerateToken(user.Username);
				return token;
			}

			throw new System.Web.Http.HttpResponseException(System.Net.HttpStatusCode.Unauthorized);
		}

		public bool CheckUser(string username, string password)
		{
			// Simple user check - should check in DB 
			if(_users.Any(e=>e.Username == username && e.Password == password))
			{
				return true;
			}

			return false;
		}
	}
}
